import React from "react";
import BackgroundVideo from "../components/home/backgroundvideo";
import UpcomingEvents from "../components/events/upcomingEvents";
import { Link, useLocation } from "react-router-dom";

const WebsiteTitle: React.FC = () => {
  return (
    <div className="relative flex justify-center h-full">
      <div className="mt-[80px] flex flex-col">
        <span className="font-bold text-7xl">PERMIAS UIUC</span>
        <span className="text-xl mt-[10px]">
          Welcome to our official Website
        </span>
      </div>
      <div className="absolute bottom-0 flex justify-center items-center h-[100px] w-[200px] mb-[10px]">
        <div className="flex">
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/whatsapp.svg"}
              alt="Whatsapp Logo"
              width={50}
              className="mx-10"
            />
          </a>
          <a
            href="https://www.instagram.com/permiasuiuc/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/instagram.svg"}
              alt="Instagram Logo"
              width={50}
              className="mx-10"
            />
          </a>
          <a
            href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2Fisc.uiuc%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/facebook.svg"}
              alt="Facebook Logo"
              width={50}
              className="mx-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="mb-[100px]">
      <div className="">
        <BackgroundVideo
          source={process.env.PUBLIC_URL + "/Home/backgroundvid.mp4"}
          children={<WebsiteTitle />}
        />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full mt-[70px] flex flex-col items-center px-[150px]">
          <div className="flex space-x-[50px]">
            <img
              className="object-cover rounded-2xl"
              src={process.env.PUBLIC_URL + "/Home/about.png"}
              alt=""
              height={700}
              width={550}
            />
            <div className="flex flex-col">
              <span className="text-3xl">About our</span>
              <span className="text-5xl font-bold text-red">Community</span>
              <span className="text-lg mt-[20px]">
                PERMIAS UIUC, also known as the Indonesian Students Club (ISC),
                is a vibrant Indonesian community based in Urbana-Champaign,
                committed to uniting Indonesian students at the University of
                Illinois at Urbana-Champaign and showcasing our rich culture to
                the wider Illinois community. Our vision centers on creating a
                welcoming and engaging environment for socializing and
                networking, both within the local Indonesian community and
                across the Midwest. Through a variety of cultural events and
                activities, we aim to foster connections, promote Indonesian
                culture, and provide valuable networking opportunities for our
                members.
              </span>
              <div className="mt-[20px]">
                <Link to="/about-us" className="mb-4">
                  <div className="bg-red rounded-2xl w-[150px] h-[50px] flex justify-center items-center">
                    <span className="text-white">Read More</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-[100px] flex flex-col items-center justify-center">
            <div>
              <span className="text-5xl font-semibold">Our </span>
              <span className="text-5xl font-bold text-red">Purpose</span>
            </div>
            <div className="flex space-x-[60px] mt-[30px]">
              <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
                <img
                  className="mt-[70px]"
                  src={process.env.PUBLIC_URL + "/Home/networking.png"}
                  alt=""
                  height={175}
                  width={175}
                />
                <div className="mt-[60px] flex flex-col items-center mx-[40px]">
                  <span className="text-4xl font-semibold text-center">
                    Networking
                  </span>
                  <div className="w-full mt-4 text-lg">
                    Connect with fellow Indonesian students in the to foster
                    professional relationships, creating a strong, supportive
                    network of peers.
                  </div>
                </div>
              </div>
              <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
                <img
                  className="mt-[70px]"
                  src={process.env.PUBLIC_URL + "/Home/entertainment.png"}
                  alt=""
                  height={175}
                  width={175}
                />
                <div className="mt-[60px] flex flex-col items-center mx-[40px]">
                  <span className="text-4xl font-semibold text-center">
                    Entertainment
                  </span>
                  <div className="w-full mt-4 text-lg">
                    Attend engaging events organized by our team, creating
                    unforgettable experiences together.
                  </div>
                </div>
              </div>
              <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
                <img
                  className="mt-[70px]"
                  src={process.env.PUBLIC_URL + "/Home/friendship.png"}
                  alt=""
                  height={175}
                  width={175}
                />
                <div className="mt-[60px] flex flex-col items-center mx-[40px]">
                  <span className="text-4xl font-semibold text-center">
                    Friendship
                  </span>
                  <div className="w-full mt-4 text-lg">
                    Forge friendships with peers sharing your culture, building
                    enduring connections that extend beyond university life.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[100px] text-center w-full">
            <span className="text-5xl font-bold">Upcoming Events</span>
            <div className="flex justify-center space-x-[150px] mt-[20px]">
              <UpcomingEvents
                eventCoverImage="buka_bersama"
                eventName="Buka Bersama"
                eventDate={28}
                eventMonth="March"
                eventLocation="Orchard Downs"
                eventTime="5:00 - 8:30 pm"
                eventrsvpLink="https://www.google.com/forms/about/"
              />
              {/* <UpcomingEvents
                eventCoverImage="satefundraising"
                eventName="Sate Fundraising"
                eventDate={8}
                eventMonth="April"
                eventLocation="Illini Union"
                eventTime="1:00 - 3:00 pm"
                eventrsvpLink="https://www.google.com/forms/about/"
              /> */}
              <UpcomingEvents
                eventCoverImage="gradnight"
                eventName="Grad Night"
                eventDate={10}
                eventMonth="May"
                eventLocation="Illini Union"
                eventTime="7:00 - 9:00 pm"
                eventrsvpLink="https://www.google.com/forms/about/"
              />
            </div>
          </div>
          <div className="flex flex-col items-center mt-[100px]">
            <div className="container px-4 mx-auto">
              <h2 className="mb-8 text-5xl font-bold text-center">
                Get Involved
              </h2>
              <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <a
                    href="https://www.google.com/forms/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4"
                  >
                    <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center">
                      <span className="text-white">Join Our Family</span>
                    </div>
                  </a>
                  <p className="text-gray-600">
                    Become a part of our community
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href="https://www.google.com/forms/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4"
                  >
                    <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center">
                      <span className="text-white">Leave Feedback</span>
                    </div>
                  </a>
                  <p className="text-gray-600">
                    Share your thoughts and suggestions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
