import "./services.css";

function Service() {
  const softwares = [
    {name: "Custom Software Development",
     desc: "Tailored software solutions to fit your unique business needs.",
     color: "#8af364",
    },
    {
      name: "POS & Billing System",
      desc: "Fast and accurate billing software for restaurants and shops.",
      color: "#ff6b6b",
    },
    {
      name: "Online Ordering App",
      desc: "Customers can order online easily from mobile or web.",
      color: "#4dabf7",
    },
    {
      name: "Inventory Management",
      desc: "Track stock levels and alerts for low inventory.",
      color: "#ffd43b",
    },
    {
      name: "Sales Analytics Dashboard",
      desc: "Visualize daily, weekly, and monthly sales data.",
      color: "#51cf66",
    },
    {
      name: "Customer Management",
      desc: "Maintain customer data and loyalty programs.",
      color: "#845ef7",
    },
    {
      name: "Automation Tools",
      desc: "Automate repetitive tasks for smoother operations.",
      color: "#ff922b",
    },
  ];

  return (
    <section className="softwares">
      <div className="softwares-hero">
        <h2 className="fade-up">What Software We Make</h2>
        <p className="fade-up delay">
          We build smart, reliable, and affordable software solutions to help your business grow.
        </p>
      </div>

      <div className="softwares-grid">
        {softwares.map((software, index) => (
          <div
            className={`software-card fade-up delay-${index}`}
            key={software.name}
            style={{ borderTop: `4px solid ${software.color}` }}
          >
            <h3 style={{ color: software.color }}>{software.name}</h3>
            <p>{software.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Service;
