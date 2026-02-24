require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const Content = require("./models/Content");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding");

    // Seed admin
    const existing = await Admin.findOne({ email: "admin@think.com" });
    if (existing) {
      console.log("Admin already exists");
    } else {
      const admin = new Admin({
        email: "admin@think.com",
        password: "admin123",
      });
      await admin.save();
      console.log("✅ Admin created successfully");
    }

    // Seed content sections
    const sections = [
      {
        sectionId: "hero",
        title: "Strategic Solutions. Proven Results.",
        body: "THINK Acquisition delivers expert acquisition support, program management, and technical consulting services to federal agencies and defense organizations.",
        metadata: {
          badgeText: "Government Contracting Excellence",
          headingLine1: "Strategic Solutions.",
          headingHighlight: "Proven Results.",
          buttonPrimaryText: "Get Started",
          buttonSecondaryText: "Our Services",
          videoUrl: "https://www.youtube.com/embed/rdJ38az0U0A?autoplay=1&mute=1&loop=1&playlist=rdJ38az0U0A&controls=1&modestbranding=1",
          badges: ["Government Cleared", "Mission Focused", "Rapid Delivery"],
        },
      },
      {
        sectionId: "about",
        title: "Mission-Driven. Results-Oriented.",
        body: "THINK Acquisition is a Service-Disabled Veteran-Owned Small Business dedicated to providing expert acquisition, program management, and technical consulting services. We partner with federal agencies to deliver efficient, compliant, and high-quality solutions.",
        metadata: {
          bullets: [
            "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
            "Proven track record with DoD and federal civilian agencies",
            "CAGE: 89VE7 | UEI: M2M1NJSDFP3",
            "Experienced team of acquisition professionals",
          ],
          stats: [
            { num: "26+", label: "Years Experience" },
            { num: "50+", label: "Contracts Delivered" },
            { num: "100%", label: "Client Satisfaction" },
            { num: "24/7", label: "Mission Support" },
          ],
          imageUrl: "/business.png",
        },
      },
      {
        sectionId: "services",
        title: "Core Services & Capabilities",
        body: "Delivering mission-critical acquisition and consulting solutions across the federal landscape.",
        metadata: {},
      },
      {
        sectionId: "contact",
        title: "Contact Us",
        body: "",
        metadata: {
          pocName: "William Randolph",
          phone: "(703) 819-6192",
          email: "william@thinkacquisition.net",
          website: "www.thinkacquisition.net",
          address: "25 Castle Haven Road, Hampton, VA 23666",
          cage: "89VE7",
          uei: "M2M1NJSDFP3",
          socioEconomicStatus: "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
          naicsCodes: ["541611", "541612", "541614", "541618", "541690", "541990", "561110", "611430"],
        },
      },
    ];

    for (const section of sections) {
      const exists = await Content.findOne({ sectionId: section.sectionId });
      if (!exists) {
        await Content.create(section);
        console.log(`✅ Content section "${section.sectionId}" seeded`);
      } else {
        console.log(`Content section "${section.sectionId}" already exists`);
      }
    }

    console.log("✅ Seeding complete");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
