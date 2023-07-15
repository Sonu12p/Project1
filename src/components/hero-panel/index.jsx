import logo from "../../assets/hero-img.png";

const Box = ({ text }) => {
  return (
      <a className="bg-white text-[#1A2B55] leading-18 font-bold shadow text-16 w-full px-24 py-24 rounded-24 flex items-center justify-between" href="#" target="_blank">
        <span>{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-32 h-32 p-8 border rounded-hafl border-slate-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
          />
        </svg>
      </a>
  );
};

export default function HeroPanel() {
  return (
    <div className="grid grid-cols-4 gap-24 mb-24">
      <div className="col-span-3">
        <div className="text-32 mb-18 font-semibold">Welcome back, Chris.</div>
        <p className="text-24 mb-18 max-w-[900px]">
          Let's take a look at your day today! you have{" "}
          <strong>0 patients</strong> scheduled and <strong>0 patients</strong>.
          you are scheduled to produce $0.00. you neeed to produce $0.00 stay on
          track this month. <a className="text-[#8AD9BF] font-semibold">View Huddle</a>
        </p>
        <div className="grid grid-cols-3 gap-24">
          <div className="col-span-1">
            <Box text="Create a Custom Campaign" />
          </div>
          <div className="col-span-1">
            <Box text="Work on My Task" />
          </div>
          <div className="col-span-1">
            <Box text="Find Revenue opportunities" />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div>
          <img className="w-full mx-auto" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}
