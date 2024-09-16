import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

interface FoodItem {
  id: number;
  name: string;
  stock: number;
  cost: number;
  price: number;
}

const CounterPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    stock: 0,
    cost: 0,
    price: 0,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchFoodItems();

    return () => subscription.unsubscribe();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const { data, error } = await supabase.from("counter").select("*");
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
        setFoodItems([...foodItems, data[0]]);
        setNewItem({ name: "", stock: 0, cost: 0, price: 0 });
      }
    } catch (error) {
      console.error("Error adding new item:", error);
      alert("Failed to add new item. Please try again.");
    }
  };

  const handleSold = async (id: number) => {
    const item = foodItems.find((item) => item.id === id);
    if (item && item.stock > 0) {
      try {
        console.log("Attempting to update item:", item);
        const { data, error } = await supabase
          .from("counter")
          .update({ stock: item.stock - 1 })
          .eq("id", id)
          .select();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("Update successful, returned data:", data);

        setFoodItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === id
              ? { ...prevItem, stock: prevItem.stock - 1 }
              : prevItem
          )
        );
      } catch (error) {
        console.error("Error updating item:", error);
        alert(
          "Failed to update the database. Please check the console for more details."
        );
      }
    } else {
      console.log("Item not found or stock is 0:", id);
    }
  };

  const calculateRevenue = (item: FoodItem) => {
    // Assuming initial stock is the current stock plus sold items
    const soldItems = item.stock - item.stock;
    return (item.price * soldItems).toFixed(2);
  };

  const calculateProfit = (item: FoodItem) => {
    const soldItems = item.stock - item.stock;
    return ((item.price - item.cost) * soldItems).toFixed(2);
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
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-4 mb-8 bg-white rounded shadow">
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

      <div className="w-full max-w-4xl mb-8 overflow-x-auto">
        <h2 className="mb-4 text-xl font-bold">Food Items</h2>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Price</th>
              <th className="p-2">Revenue</th>
              <th className="p-2">Profit</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2">${item.cost.toFixed(2)}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">${calculateRevenue(item)}</td>
                <td className="p-2">${calculateProfit(item)}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleSold(item.id)}
                    className="px-2 py-1 text-white rounded bg-red hover:bg-red"
                    disabled={item.stock === 0}
                  >
                    Sold
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-4xl p-4 mb-8 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold">Overall Summary</h2>
        <p className="mb-2">Total Revenue: ${calculateTotalRevenue()}</p>
        <p>Total Profit: ${calculateTotalProfit()}</p>
      </div>

      <button
        className="px-6 py-2 mt-8 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
};

export default CounterPage;
