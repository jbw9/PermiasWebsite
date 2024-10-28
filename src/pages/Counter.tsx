import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

interface FoodItem {
  id: number;
  name: string;
  stock: number;
  cost: number;
  price: number;
  sold: number;
}

interface HeadCount {
  id: number;
  count: number;
}

const CounterPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [headCount, setHeadCount] = useState<number>(0);
  const [newItem, setNewItem] = useState({
    name: "",
    stock: 0,
    cost: 0,
    price: 0,
    sold: 0,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchFoodItems();
        fetchHeadCount();
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchFoodItems();
        fetchHeadCount();
      }
    });

    const intervalId = setInterval(() => {
      fetchFoodItems();
      fetchHeadCount();
    }, 500);

    return () => {
      subscription.unsubscribe();
      clearInterval(intervalId);
    };
  }, []);

  const fetchHeadCount = async () => {
    try {
      const { data, error } = await supabase
        .from("pplCounter")
        .select("count")
        .eq("id", 0)
        .single();

      if (error) throw error;

      if (data) {
        setHeadCount(data.count);
      } else {
        // Initialize head count if it doesn't exist
        const { error: insertError } = await supabase
          .from("pplCounter")
          .insert({ id: 0, count: 0 });

        if (insertError) throw insertError;
        setHeadCount(0);
      }
    } catch (error) {
      console.error("Error fetching head count:", error);
    }
  };

  const updateHeadCount = async (newCount: number) => {
    try {
      const { error } = await supabase
        .from("pplCounter")
        .upsert({ id: 0, count: newCount })
        .eq("id", 0);

      if (error) throw error;

      setHeadCount(newCount);
    } catch (error) {
      console.error("Error updating head count:", error);
      alert("Failed to update head count. Please try again.");
    }
  };

  const handleIncrement = () => {
    updateHeadCount(headCount + 1);
  };

  const handleDecrement = () => {
    if (headCount > 0) {
      updateHeadCount(headCount - 1);
    }
  };

  const handleResetHeadCount = async () => {
    if (window.confirm("Are you sure you want to reset the head count to 0?")) {
      try {
        const { error } = await supabase
          .from("pplCounter")
          .update({ count: 0 })
          .eq("id", 0);

        if (error) throw error;

        setHeadCount(0);
      } catch (error) {
        console.error("Error resetting head count:", error);
        alert("Failed to reset head count. Please try again.");
      }
    }
  };

  const fetchFoodItems = async () => {
    try {
      const { data, error } = await supabase
        .from("counter")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        throw error;
      }
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
      alert(
        "Failed to fetch food items. Please check your internet connection and try again."
      );
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await fetchFoodItems();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const { data, error } = await supabase
        .from("counter")
        .insert([newItem])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setFoodItems([...foodItems, ...data]);
        setNewItem({ name: "", stock: 0, cost: 0, price: 0, sold: 0 });
      }
    } catch (error) {
      console.error("Error adding new item:", error);
      alert("Failed to add new item. Please try again.");
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const { error } = await supabase.from("counter").delete().eq("id", id);

        if (error) {
          throw error;
        }

        setFoodItems(foodItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  const handleSold = async (id: number) => {
    const item = foodItems.find((item) => item.id === id);
    if (item && item.stock > 0) {
      try {
        const { data, error } = await supabase
          .from("counter")
          .update({ stock: item.stock - 1, sold: item.sold + 1 })
          .eq("id", id)
          .select();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        setFoodItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === id
              ? {
                  ...prevItem,
                  stock: prevItem.stock - 1,
                  sold: prevItem.sold + 1,
                }
              : prevItem
          )
        );
      } catch (error) {
        console.error("Error updating item:", error);
        alert(
          "Failed to update the database. Please check the console for more details."
        );
      }
    }
  };

  const calculateRevenue = (item: FoodItem) => {
    return (item.price * item.sold).toFixed(2);
  };

  const calculateProfit = (item: FoodItem) => {
    return ((item.price - item.cost) * item.sold).toFixed(2);
  };

  const calculateTotalRevenue = () => {
    return foodItems
      .reduce((total, item) => total + parseFloat(calculateRevenue(item)), 0)
      .toFixed(2);
  };

  const calculateTotalProfit = () => {
    return foodItems
      .reduce((total, item) => total + parseFloat(calculateProfit(item)), 0)
      .toFixed(2);
  };

  const calculateTotalItemsSold = () => {
    return foodItems.reduce((total, item) => total + item.sold, 0);
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all items? This cannot be undone."
      )
    ) {
      try {
        setLoading(true);
        const { error } = await supabase.from("counter").delete().neq("id", 0);

        if (error) throw error;

        setFoodItems([]);
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 bg-white rounded shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white rounded bg-red"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Head Counter Section */}
      <div className="w-full max-w-4xl p-4 mb-8 bg-white shadow rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Head Count</h2>
          <button
            onClick={handleResetHeadCount}
            className="px-4 py-2 text-white rounded bg-red"
          >
            Reset Count
          </button>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 text-white rounded bg-red"
            disabled={headCount === 0}
          >
            -
          </button>
          <span className="text-2xl font-bold min-w-[4rem] text-center">
            {headCount}
          </span>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 text-white rounded bg-red"
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 mb-8 bg-white shadow rounded-xl">
        <h2 className="mb-4 text-xl font-bold">Add New Item</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({ ...newItem, stock: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="cost"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Cost ($)
            </label>
            <input
              id="cost"
              type="number"
              step="0.01"
              value={newItem.cost}
              onChange={(e) =>
                setNewItem({ ...newItem, cost: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={handleAddItem}
          className="px-4 py-2 mt-4 text-white rounded bg-red"
        >
          Add Item
        </button>
      </div>

      <div className="w-full max-w-4xl p-4 mb-8 bg-white shadow rounded-xl">
        <h2 className="mb-4 text-xl font-bold">Overall Food Summary</h2>
        <p className="mb-2">Total Revenue: ${calculateTotalRevenue()}</p>
        <p className="mb-2">Total Profit: ${calculateTotalProfit()}</p>
        <p>Total Items Sold: {calculateTotalItemsSold()}</p>
      </div>

      <div className="w-full max-w-4xl mb-8 overflow-x-auto">
        <h2 className="mb-4 text-xl font-bold">Food Items</h2>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-right">Stock</th>
              <th className="p-2 text-right">Sold</th>
              <th className="p-2 text-right">Cost</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-center">Action</th>
              <th className="p-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 text-left">{item.name}</td>
                <td className="p-2 text-right">{item.stock}</td>
                <td className="p-2 text-right">{item.sold}</td>
                <td className="p-2 text-right">${item.cost.toFixed(2)}</td>
                <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleSold(item.id)}
                    className={`px-2 py-1 text-white rounded ${
                      item.stock === 0 ? "bg-gray-400" : "bg-red hover:bg-red"
                    }`}
                    disabled={item.stock === 0}
                  >
                    Sold
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-2 py-1 text-white rounded bg-red hover:bg-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between w-full max-w-4xl">
        <button
          className="px-6 py-2 mt-8 text-white rounded-md bg-red"
          onClick={handleReset}
        >
          Reset All
        </button>
        <button
          className="px-6 py-2 mt-8 rounded-md text-red"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default CounterPage;
