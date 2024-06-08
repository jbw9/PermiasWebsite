import React from "react";
import Contacts from "../components/contact/contacts";
import FAQ from "../components/contact/FAQ";

const ContactInfo: React.FC = () => {
  return (
    <div>
      <Contacts />
      <FAQ />
    </div>
  );
};

export default ContactInfo;
