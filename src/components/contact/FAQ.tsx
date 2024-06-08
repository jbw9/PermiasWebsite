import React from "react";
import Dropdown, { DropdownProps } from "./dropdown";

const FAQ = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center mt-10 px-8 mb-[100px] w-[70%]">
        <span className="text-5xl font-bold text-red mb-[20px]">
          Frequently Asked Questions
        </span>
        <span className="text-2xl text-footer mb-[40px]">
          How can we help you?
        </span>
        <div className="w-full">
          <div>
            <span className="text-2xl font-bold text-footer">
              Preparing as a New Student
            </span>
            <Dropdown
              text="What should I bring and not bring to the US?"
              desc={`
<ul class="list-disc pl-6">
  <li><strong>Consider to Bring:</strong>
    <ul class="list-disc pl-6">
      <li>Important Documents: Passport, Visa, I-20, SEVIS receipt (Place them in your backpack so you can reference them during immigration.)</li>
      <li>Indonesian snacks/spices</li>
      <li>Batik</li>
      <li>Guling (preference)</li>
      <li>Personal electronics &amp; Adapter</li>
      <li>Portable bidet</li>
      <li>Prescriptions</li>
    </ul>
  </li>
  <li><strong>Not Bring:</strong>
    <ul class="list-disc pl-6">
      <li>Food Items:
        <ul class="list-disc pl-6">
          <li>Prohibited: Avoid bringing meats, fresh fruits, vegetables, plants, seeds, soil, and products made from animal or plant materials.</li>
          <li>Restricted: Some food items may require special licenses or permits from federal agencies. It's essential to check specific regulations for the items you plan to bring.</li>
        </ul>
      </li>
      <li>Medications:
        <ul class="list-disc pl-6">
          <li>Always carry a doctor's note for any prescription medications.</li>
          <li>For detailed rules on the medications you're bringing, contact the U.S. Food and Drug Administration (FDA) and U.S. Customs and Border Protection (CBP).</li>
        </ul>
      </li>
      <li>Items that can be easily purchased in the US (household items, skin care products, large appliances)</li>
    </ul>
  </li>
</ul>
`}
            />
            <Dropdown
              text="What health services are available?"
              desc={`
<ul class="list-disc pl-6">
  <li><strong>General Health:</strong> McKinley Health Center provides medical services, including check-ups, vaccinations, and urgent care. <a href="https://mckinley.illinois.edu/get-healthcare/mymckinley" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">MyMcKinley | McKinley Health Center | UIUC</a></li>
  <li><strong>Mental Health:</strong> The Counseling Center offers support for mental health issues, including counseling and workshops.</li>
</ul>
`}
            ></Dropdown>
            <Dropdown
              text="What are the available payment plans?"
              desc={`The university offers various payment plans through the Bursar's Office. Visit the Payment Center for details.`}
            ></Dropdown>
            <Dropdown
              text="How do I get an I-Card?"
              desc={`Obtain your I-Card during New Student Orientation or visit the I-Card office. It is located at the Illini Bookstore`}
            ></Dropdown>
            <Dropdown
              text="What is New Student Orientation/Convocation?"
              desc={`Orientation helps new students acclimate to campus life. Convocation is a formal welcome event.
            `}
            ></Dropdown>
            <Dropdown
              text="What is Quad Day?"
              desc={`Quad Day is an event where student organizations showcase their activities. It’s a great opportunity to join clubs and meet new people.`}
            ></Dropdown>
            <Dropdown
              text="How do I open a bank account?"
              desc={`Visit local banks such as PNC, Chase, or Bank of America with your I-20, passport, and proof of address.`}
            ></Dropdown>
            <Dropdown
              text="How can I get a mobile phone plan?"
              desc={`Options include AT&T, Verizon, Mint Mobile, and T-Mobile. Bring your passport and I-20 to set up a plan.
            `}
            ></Dropdown>
          </div>

          <div className="mt-[30px]">
            <span className="text-2xl font-bold text-footer">Academic</span>
            <Dropdown
              text="How do I register for courses?"
              desc={`Visit UIUC Self-Service and contact your academic advisor for guidance on course registration.`}
            ></Dropdown>
            <Dropdown
              text="What is Credit/No Credit?"
              desc={`Credit/No Credit is an option for taking courses without affecting your GPA. Consult your advisor for eligibility.`}
            ></Dropdown>
            <Dropdown
              text="What are Proficiency Exams?"
              desc={`These exams allow you to earn course credit for prior knowledge. Check the Proficiency Testing page for details.
`}
            ></Dropdown>
            <Dropdown
              text="Where can I get academic assistance?"
              desc={`
              <ul class="list-disc pl-6">
  <li>Chemistry Learning Center</li>
  <li>Student Support Center for Math & Stats</li>
  <li>Grainger Engineering Library CARE</li>
</ul>`}
            ></Dropdown>
            <Dropdown
              text="What are Double & Triple-dip GenEd Courses?"
              desc={`Courses that satisfy multiple General Education requirements. Check the course catalog for eligible classes in Course Explorer.
              `}
            ></Dropdown>
            <Dropdown
              text="Where can I find syllabuses?"
              desc={`Syllabuses are usually available on the course's Moodle or Canvas page.`}
            ></Dropdown>
            <Dropdown
              text="Where are libraries and places to study?"
              desc={`
            <ul class="list-disc pl-6">
            <li><strong>Libraries:</strong> Main Library, Grainger Engineering Library, Undergraduate Library, ACES Funk Library.
            </li>
            <li><strong>Study Spaces:</strong> Union Study Lounge, CIF, BIF, various academic buildings</li>
          </ul>`}
            ></Dropdown>
          </div>

          <div className="mt-[30px]">
            <span className="text-2xl font-bold text-footer">Accomodation</span>
            <Dropdown
              text="What are the housing options?"
              desc={`
            <ul class="list-disc pl-6">
            <li><strong>Freshman Dorms: </strong><a href="https://www.housing.illinois.edu/living-communities/halls/undergraduate" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Undergraduate Halls</a></li>
            <li><strong>Private Certified Housing: </strong><a href="https://certified.housing.illinois.edu/" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">PCH</a></li>
            <li><strong>Graduate & Upper Division Housing: </strong><a href="https://housing.illinois.edu/living-communities/halls/gud" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">GUD</a></li>
            <li><strong>Graduate & Family Housing: </strong><a href="https://www.housing.illinois.edu/Living-Communities/Apartments" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Family Apartments</a></li>
            <li><strong>Apartments: </strong>JSM, University Group, Smile, Green Street Realty, Campustown Rentals.
            </li>
          </ul>`}
            ></Dropdown>
            <Dropdown
              text="How do I find a roommate?"
              desc={`Use university resources, Facebook groups, or housing office assistance.`}
            ></Dropdown>
            <Dropdown
              text="What are the bus routes?"
              desc={`Check the <a href="https://www.cumtd.com/" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">CUMTD website</a>`}
            ></Dropdown>
            <Dropdown
              text="What is break housing?"
              desc={`University housing provides options for staying on campus during breaks. Check with your housing office.`}
            ></Dropdown>
            <Dropdown
              text="What should I bring and not bring for dorm living?"
              desc={`            <ul class="list-disc pl-6">
              <li><strong>Bring:</strong> Bedding, toiletries, laundry supplies, and small kitchen items. (You don’t need to pack these, they are usually easy to purchase in the U.S.)
              </li>
              <li><strong>Do Not Bring:</strong> Large appliances and prohibited items (such as candles and hot plates). If you need a fridge and microwave, you can purchase them from other Indonesians, rent, or buy new ones.</li>
            </ul>`}
            ></Dropdown>

            <div className="mt-[30px]">
              <span className="text-2xl font-bold text-footer">
                Social Life & Indonesian Community
              </span>
              <Dropdown
                text="Where can I buy Asian/Indonesian groceries?"
                desc={`
                          <ul class="list-disc pl-6">
                          <li><strong>Fresh International Market: </strong><a href="https://maps.app.goo.gl/dL4fZmbVsQ8ZnL5m9" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Map</a></li>
                          <li><strong>Far East Grocery: </strong><a href="https://maps.app.goo.gl/fV2zLunFT6su5utN7" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Map</a></li>
                          <li><strong>Asian Supermarket: </strong><a href="https://maps.app.goo.gl/WT5c4SzGMAqF1W37A" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Map</a></li>
                          <li><strong>Green Onion Asian Market: </strong><a href="https://maps.app.goo.gl/fWHKw8znZnjaVT6U6" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Map</a></li>
                          <li><strong>Maligaya's Oriental Market: </strong><a href="https://maps.app.goo.gl/AqRcWbdE67DPTjTXA" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Map</a></li>
                        </ul>`}
              ></Dropdown>
              <Dropdown
                text="Where can I find halal meat?"
                desc={`                          <ul class="list-disc pl-6">
                <li><strong>Strawberry Fields: </strong><a href="https://maps.app.goo.gl/MAMu67BHwDU1CKyX9" target="_blank" rel="noopener noreferrer" style="color: blue; text-decoration: underline;">Map</a></li>
                <li><strong>Halal Meat from Community: </strong>Join the local Pengajian community for more info.</li>
              </ul>`}
              ></Dropdown>
              <Dropdown
                text="What should I do if I need help?"
                desc={`PERMIAS has a list of contact persons for assistance based on your background. Reach out if you need help.`}
              ></Dropdown>
              <Dropdown
                text="How can I join Indonesian community events?"
                desc={`Join PERMIAS and participate in our events. Follow our social media for updates.
                `}
              ></Dropdown>
            </div>

            <div className="mt-[30px]">
              <span className="text-2xl font-bold text-footer">
                Additional Questions
              </span>
              <Dropdown
                text="How can I find part-time jobs on campus?"
                desc={`Check the university's job board, visit the career center, or inquire within departments for assistant positions.`}
              ></Dropdown>
              <Dropdown
                text="How do I navigate cultural differences?"
                desc={`Attend cultural workshops, engage with diverse student groups, and seek support from the International Student and Scholar Services (ISSS).`}
              ></Dropdown>
              <Dropdown
                text="What transportation options are available?"
                desc={`Buses, bikes, and walking are common. For longer distances, use Amtrak or rideshare services.`}
              ></Dropdown>
              <Dropdown
                text="How do I get involved in research?"
                desc={`Talk to professors, check departmental announcements, or visit the Office of Undergraduate Research for opportunities.`}
              ></Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
