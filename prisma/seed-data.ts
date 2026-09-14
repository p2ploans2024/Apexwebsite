import { brand } from "../src/lib/brand";

export type SeedQuestion = {
  prompt: string;
  options: { text: string; isCorrect: boolean }[];
};

export type SeedLesson = {
  title: string;
  minutes: number;
  content: string;
};

export type SeedModule = {
  title: string;
  description: string;
  lessons: SeedLesson[];
};

export type SeedCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  durationHours: number;
  level: string;
  priceCents: number;
  featured: boolean;
  accent: string;
  learningOutcomes: string[];
  includes: string[];
  modules: SeedModule[];
  quiz: {
    title: string;
    passPercent: number;
    questions: SeedQuestion[];
  };
};

export const seedCourses: SeedCourse[] = [
  {
    slug: "food-handler-essentials",
    title: "Food Handler Essentials",
    subtitle: "Core hygiene, contamination, and temperature control for every person who touches food.",
    description:
      "This course prepares frontline kitchen and service staff to handle food safely on a busy shift. Learners practice the daily habits that prevent foodborne illness: personal hygiene, preventing contamination, holding food at safe temperatures, and knowing when to stop service and ask for help. Content is aligned with FDA Food Code principles used across U.S. foodservice operations.",
    audience: "Line cooks, servers, dishwashers, catering staff, and new hires",
    durationHours: 4,
    level: "Foundation",
    priceCents: 4900,
    featured: true,
    accent: "#0F4D4A",
    learningOutcomes: [
      "Apply personal hygiene standards that actually hold up during a rush",
      "Identify biological, chemical, and physical hazards in a working kitchen",
      "Use time and temperature controls to keep TCS foods out of the danger zone",
      "Prevent cross-contamination on boards, tools, and ready-to-eat items",
      "Know when food must be discarded and how to report a problem",
    ],
    includes: [
      "Self-paced lessons with workplace scenarios",
      "End-of-course knowledge check (80% to pass)",
      "Printable certificate of completion",
      `Progress saved to your ${brand.name} learner dashboard`,
    ],
    modules: [
      {
        title: "Why food safety is an operations skill",
        description: "Illness, liability, and the habits that protect guests and the business.",
        lessons: [
          {
            title: "What foodborne illness really costs",
            minutes: 8,
            content: `Foodborne illness is not an abstract training topic. It is a guest in the hospital, a health department visit, and a reputation that takes years to rebuild.

Most outbreaks tied to restaurants start with ordinary mistakes: a cook who worked while sick, a pan of rice that cooled too slowly, or a cutting board used for raw chicken and then for salad. The FDA Food Code exists because these errors are predictable — and preventable.

In this course you will treat food safety as part of the job, not extra paperwork. That means knowing **what can go wrong**, **how to stop it**, and **when to escalate**.

### The five most common risk factors
1. Purchasing food from unsafe sources
2. Failing to cook food adequately
3. Holding food at incorrect temperatures
4. Using contaminated equipment
5. Poor personal hygiene

If your station can control those five, you are already doing professional work.

> **Shift standard:** If you would not serve it to your own family, do not serve it to a guest. When in doubt, ask a manager — throwing away product is cheaper than an outbreak.`,
          },
          {
            title: "Who is at higher risk — and why it matters on the line",
            minutes: 7,
            content: `Not every guest can fight off the same dose of bacteria. Some people become seriously ill from amounts of pathogens that might only cause a mild stomach ache in a healthy adult.

**Highly susceptible populations include:**
- Children younger than 4
- Older adults
- Pregnant people
- Guests with weakened immune systems
- People in hospitals, long-term care, and some school programs

You often cannot tell who is in these groups by looking. A school catering order, a hospital café, or a family dinner all require the same discipline.

### What this means in practice
- Never work while vomiting, with diarrhea, or with jaundice.
- Never touch ready-to-eat food with bare hands unless your operation has a written, approved alternative.
- Cook and hold TCS foods to the temperatures your manager posted — not “until it looks done.”
- Tell a manager immediately if a guest reports an allergy or if you believe food was temperature-abused.

${brand.name} trains this as professional courtesy: the guest trusted you with their meal. Protect that trust.`,
          },
        ],
      },
      {
        title: "Contamination and personal hygiene",
        description: "How pathogens travel — and the hygiene rules that interrupt them.",
        lessons: [
          {
            title: "Biological, chemical, and physical hazards",
            minutes: 10,
            content: `A **hazard** is anything in food that can cause injury or illness. Food handlers need to recognize three groups.

### Biological hazards
Bacteria, viruses, parasites, and fungi. Bacteria such as *Salmonella*, *E. coli*, and *Listeria* grow quickly in Time/Temperature Control for Safety (TCS) foods — meat, poultry, eggs, dairy, cooked rice and pasta, cut produce, and many sauces.

Viruses such as norovirus and hepatitis A do not grow in food, but they travel easily from unwashed hands to ready-to-eat items.

### Chemical hazards
Cleaners, sanitizers, pest-control products, and even some kitchen equipment (unlined copper with acidic food). Store chemicals away from food. Never use a food container to hold chemicals, and never use a chemical bottle to hold food.

### Physical hazards
Bone fragments, metal shavings, glass, jewelry, bandages, and fruit pits. Hair restraints, intact equipment, and no jewelry on hands and arms (except a plain band, if allowed) reduce this risk.

### How contamination usually happens
- Hands that were not washed after using the restroom
- Raw animal foods dripping onto ready-to-eat food in a cooler
- A wiping cloth that sat in a bucket with no sanitizer
- An employee tasting with a soiled spoon and putting it back in the pan

Control the path, and you control the hazard.`,
          },
          {
            title: "Handwashing, gloves, and working while ill",
            minutes: 9,
            content: `Handwashing is the highest-leverage habit in foodservice. Do it the same way every time so it still happens when the ticket rail is full.

### When to wash
Wash hands in a designated hand sink (never in a prep or dishwashing sink) at least:
- Before starting work and when returning to the station
- After using the restroom
- After handling raw meat, poultry, or seafood
- After touching the body, phone, trash, or chemicals
- After eating, drinking, or smoking
- Before putting on gloves and when changing tasks

### How to wash (20 seconds)
1. Wet hands with running water as hot as you can comfortably stand
2. Apply soap
3. Scrub hands, wrists, and between fingers for at least 10–15 seconds
4. Rinse
5. Dry with a single-use towel; use the towel to turn off the faucet

### Gloves
Gloves are a tool, not a shield. Change them when they tear, when you switch from raw to ready-to-eat, after contaminating them, and at least every four hours during continuous use. Wash hands every time you change gloves.

### Employee health
Do not work if you have vomiting, diarrhea, jaundice, or a diagnosed foodborne illness. Report sore throat with fever, infected wounds on hands or arms, and exposure to norovirus or hepatitis A to your manager. Cover wounds with an impermeable bandage and a glove when required.

This is not optional professionalism. It is how kitchens keep people out of the emergency room.`,
          },
        ],
      },
      {
        title: "Time, temperature, and the flow of food",
        description: "Keep TCS foods out of the danger zone from delivery to service.",
        lessons: [
          {
            title: "The temperature danger zone",
            minutes: 10,
            content: `Pathogens grow fastest between **41°F and 135°F** (5°C–57°C). That range is the **temperature danger zone**. Time in the zone is limited; growth is not theoretical.

### Core numbers to memorize
| Action | Target |
| --- | --- |
| Cold holding | 41°F (5°C) or lower |
| Hot holding | 135°F (57°C) or higher |
| Cooling | 135°F to 70°F in 2 hours, then to 41°F in 4 more hours (6 hours total) |
| Reheating for hot holding | 165°F (74°C) within 2 hours |
| Poultry, stuffed foods, leftovers | Cook to 165°F (74°C) for 15 seconds |
| Ground meat | 155°F (68°C) for 17 seconds |
| Seafood, steaks, eggs for immediate service | 145°F (63°C) for 15 seconds |

Always use a calibrated, cleaned, and sanitized thermometer. Color and steam are not proof.

### Cooling that actually works
Large pots of soup do not cool safely in a walk-in as a single mass. Use ice wands, ice baths, shallow pans, smaller portions, and leave pans loosely covered until the food is cold. If the two-stage cooling times are missed, discard the food.

### Date marking
TCS ready-to-eat food held longer than 24 hours must be date marked and used or discarded within 7 days (day of prep counts as day 1), unless your local code is stricter.

Temperature control is a measurement habit. If you did not check it, you do not know it.`,
          },
          {
            title: "Preventing cross-contamination on a busy station",
            minutes: 8,
            content: `Cross-contamination is the transfer of pathogens from one food or surface to another. It is how raw chicken becomes a salad problem.

### Station rules that scale
- Use separate cutting boards and knives for raw animal foods and ready-to-eat foods. Color-coding helps when staff remember why the colors exist.
- Store raw meat, poultry, and seafood **below** ready-to-eat food in coolers. Poultry on the bottom.
- Clean and sanitize a surface every time you switch from raw to ready-to-eat — wiping with a dry towel is not sanitizing.
- Never use a tasting spoon twice. Use a clean utensil each time.
- Keep wiping cloths in correctly mixed sanitizer solution; change the solution when it is dirty or below the required concentration.

### Cleaning vs. sanitizing
**Cleaning** removes food and dirt. **Sanitizing** reduces pathogens on a clean surface to safe levels. You cannot sanitize a dirty surface. Follow the three-compartment method or the machine’s posted process: wash, rinse, sanitize, air-dry.

### Allergens sneak in the same way
Shared fryer oil, a knife that cut shrimp then avocado, or a garnish dropped by hand can trigger a severe allergic reaction. Treat allergen requests as a manager-assisted procedure, not a “be careful” whisper.

If your station is organized, contamination has fewer places to hide.`,
          },
        ],
      },
    ],
    quiz: {
      title: "Food Handler knowledge check",
      passPercent: 80,
      questions: [
        {
          prompt: "What is the temperature danger zone for TCS foods?",
          options: [
            { text: "32°F to 40°F", isCorrect: false },
            { text: "41°F to 135°F", isCorrect: true },
            { text: "135°F to 165°F", isCorrect: false },
            { text: "70°F to 100°F", isCorrect: false },
          ],
        },
        {
          prompt: "When must a food handler wash their hands?",
          options: [
            { text: "Only at the start of the shift", isCorrect: false },
            { text: "After handling raw poultry, before touching ready-to-eat food, and after using the restroom", isCorrect: true },
            { text: "Only if gloves are not available", isCorrect: false },
            { text: "Once every two hours, regardless of tasks", isCorrect: false },
          ],
        },
        {
          prompt: "Which storage order in a cooler is safest?",
          options: [
            { text: "Raw poultry on the top shelf above produce", isCorrect: false },
            { text: "Ready-to-eat food on top; raw poultry on the bottom", isCorrect: true },
            { text: "All raw proteins on the same shelf as desserts", isCorrect: false },
            { text: "Chemicals stored next to ice bins for quick access", isCorrect: false },
          ],
        },
        {
          prompt: "A cook has been vomiting overnight but feels “well enough” to work lunch. What should they do?",
          options: [
            { text: "Work, but only on the fryer", isCorrect: false },
            { text: "Wear a double layer of gloves and a mask", isCorrect: false },
            { text: "Stay home and report symptoms to the manager", isCorrect: true },
            { text: "Start the shift and leave if symptoms return", isCorrect: false },
          ],
        },
        {
          prompt: "What is the two-stage cooling requirement commonly used in foodservice?",
          options: [
            { text: "Cool from 135°F to 41°F in 8 hours in a deep stockpot", isCorrect: false },
            { text: "Cool from 135°F to 70°F in 2 hours, then to 41°F in 4 more hours", isCorrect: true },
            { text: "Cool to room temperature on the counter, then refrigerate", isCorrect: false },
            { text: "Freeze immediately from hot holding", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "food-protection-manager",
    title: "Food Protection Manager",
    subtitle: "Lead a kitchen that can pass inspection and run HACCP-minded processes every day.",
    description:
      "Designed for managers, chefs, and operators who own the food safety system — not just a station. You will walk the flow of food from supplier to service, build monitoring habits, and practice the decisions inspectors and auditors expect: corrective action, employee health, allergen control, and documented training. Use this course to prepare teams that also sit for nationally recognized manager exams.",
    audience: "Kitchen managers, chefs, operators, and shift leads",
    durationHours: 8,
    level: "Manager",
    priceCents: 17900,
    featured: true,
    accent: "#1B365D",
    learningOutcomes: [
      "Map the flow of food and place controls where they actually fail",
      "Apply HACCP principles to everyday restaurant processes",
      "Coach employee health, hygiene, and allergen procedures",
      "Set monitoring, corrective action, and recordkeeping that survive an inspection",
      "Evaluate suppliers, facilities, pest control, and cleaning programs",
    ],
    includes: [
      "Manager-level modules with inspection-style scenarios",
      "Capstone knowledge check (80% to pass)",
      "Certificate of completion for training records",
      `Enrollment tracking for your team in the ${brand.name} LMS`,
    ],
    modules: [
      {
        title: "The manager’s food safety system",
        description: "Active managerial control, HACCP thinking, and inspection readiness.",
        lessons: [
          {
            title: "Active managerial control",
            minutes: 12,
            content: `A certified manager is not a title on the schedule. It is the person who notices a cooler at 48°F at 10 a.m. and does something before lunch.

**Active managerial control** means you deliberately reduce the five CDC risk factors through:
- Policies that staff can follow under pressure
- Training that is verified, not assumed
- Monitoring (temperatures, sanitizer, employee health)
- Corrective action that is written and used
- Records an inspector can read without a scavenger hunt

### What “good” looks like
- A person in charge is present and can answer how the operation handles sick employees, allergens, and TCS foods.
- Thermometers are calibrated and used, not stored in a drawer for show.
- Date marks, cooling logs, and receiving checks match what is actually in the cooler.
- Staff can describe the procedure, not just point at a poster.

${brand.name} frames this as operations leadership. If the only time food safety is discussed is the week before an inspection, the system is not real.`,
          },
          {
            title: "HACCP principles without the binder theater",
            minutes: 14,
            content: `HACCP (Hazard Analysis and Critical Control Points) is a preventive system. Even operations that are not required to keep a full HACCP plan benefit from the seven principles.

1. **Conduct a hazard analysis** — Where could biological, chemical, or physical hazards enter?
2. **Determine critical control points (CCPs)** — Cooking, cooling, and hot holding are common CCPs in restaurants.
3. **Establish critical limits** — Example: poultry cooked to 165°F.
4. **Establish monitoring** — Who checks, with what, how often?
5. **Establish corrective actions** — If chicken is 150°F, it goes back on the grill; it is not plated with extra sauce.
6. **Establish verification** — Managers review logs; thermometers are calibrated.
7. **Establish recordkeeping** — If it was not recorded, it is hard to prove.

### A practical example: chili
- Hazard: *Clostridium perfringens* growth during slow cooling
- CCP: Cooling
- Limit: 135°F to 70°F in 2 hours, then to 41°F in 4 hours
- Monitor: Temperature at 1-hour intervals with a probe
- Corrective action: Ice bath, divide into shallow pans, or discard if time is exceeded
- Verify: Chef reviews cooling logs twice weekly
- Record: Cooling log initialed by the cook

Managers who can explain this at the table will also pass a conversation with a health inspector.`,
          },
        ],
      },
      {
        title: "The flow of food",
        description: "Purchasing, receiving, storage, prep, cooking, holding, cooling, and service.",
        lessons: [
          {
            title: "Suppliers, receiving, and storage",
            minutes: 11,
            content: `Food safety starts before the delivery van doors open.

### Approved suppliers
Buy from reputable suppliers that are inspected and can show invoices. Home-prepared foods have no place in a licensed kitchen. For shellstock, keep identification tags for 90 days after the last shellfish from that container is sold.

### Receiving
- Reject TCS food received above 41°F (or above 45°F for live shellfish / eggs as code allows — know your local rules).
- Reject frozen food with signs of thawing and refreezing.
- Reject cans that are swollen, rusted through, or deeply dented at seams.
- Put TCS deliveries away immediately. Do not stage them in a warm hallway “until we have time.”

### Storage
- FIFO: first in, first out. New product behind older product.
- Store food at least 6 inches off the floor.
- Label working containers of prepped food with the common name.
- Keep chemicals in a designated area, never above food.

Managers should walk the walk-in with a thermometer, not just a clipboard. Product location tells you whether staff understand the system.`,
          },
          {
            title: "Cooking, holding, and service decisions",
            minutes: 12,
            content: `Cooking is a kill step for many vegetative bacteria, but it does not destroy all toxins or spores. That is why cooling and holding still matter after a perfect cook.

### Manager checkpoints
- **Cooking:** Verify with a thermometer in the thickest part. Consumer advisories are required when serving undercooked animal foods, and some items (like undercooked ground meat for highly susceptible populations) are not appropriate.
- **Hot holding:** 135°F or hotter. Stir, cover when practical, and never mix a fresh batch into a pan that has been sitting.
- **Cold holding:** 41°F or colder. Prep in small batches. Ice baths for items on a buffet.
- **Time as a public health control:** If you hold TCS food without temperature control, you need a written procedure, labels, and hard discard times (typically 4 hours, or 6 hours with extra cold-holding conditions). This is not an informal “we’ll use it up.”
- **Service:** Bare-hand contact with ready-to-eat food is a leading inspection violation. Use utensils, deli paper, or gloves as required.

### When food must be discarded
If you cannot verify time and temperature history, discard. Managers who “save” questionable food teach the team that records are optional.

Document the decision. Training without records looks like a suggestion.`,
          },
        ],
      },
      {
        title: "People, facilities, and allergens",
        description: "The operational controls inspectors look at after they check the cooler.",
        lessons: [
          {
            title: "Employee health and allergen management",
            minutes: 12,
            content: `Two of the highest-severity inspection issues are sick employees and undeclared allergens.

### Employee health
You need a written policy that staff can recite:
- Symptoms that restrict or exclude (vomiting, diarrhea, jaundice, sore throat with fever in some settings)
- Reportable diagnoses (norovirus, hepatitis A, *Shigella*, STEC, *Salmonella* Typhi, nontyphoidal *Salmonella*)
- Who they tell (the person in charge)
- When they can return (often 24 hours symptom-free, longer for some diagnoses — follow code and medical clearance)

Managers who let a star cook “tough it out” through norovirus can close a dining room.

### Allergens
The major U.S. food allergens include milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans, and sesame. Your job is not to memorize recipes from memory under pressure — it is to have a procedure:

1. Staff take the request seriously and involve a manager or designated person.
2. Ingredients are confirmed from labels and recipes, not from “I think it’s fine.”
3. The dish is prepared to avoid cross-contact: clean utensils, fresh oil if needed, covered storage, washed hands, new gloves.
4. If you cannot guarantee it, say so. Do not guess.

${brand.name} recommends treating every allergen ticket as a documented process, the same way you would treat a cook-temp CCP.`,
          },
          {
            title: "Cleaning programs, pests, and the building",
            minutes: 10,
            content: `A beautiful dining room with a filthy dish pit is still a risk.

### Cleaning and sanitizing
- Post the sanitizer type, concentration, and contact time. Test with the correct papers every time a bucket is mixed.
- Clean as you go; schedule deep cleaning for equipment that is otherwise “always in use.”
- Maintain dishwashers: scrape, right temperature or chemical concentration, and air-dry. Cloth-drying recontaminates.

### Facilities
- Hand sinks stocked, accessible, and used only for hands.
- Adequate lighting, smooth and cleanable surfaces, and equipment in good repair.
- Plumbing that prevents sewage backup and backflow.
- Restroom doors that do not open directly into food prep without a buffer where required.

### Integrated pest management
Pests are an operations failure, not just a vendor’s problem. Deny access (seal gaps), deny food and water (clean, store food sealed), and work with a licensed pest-control operator. Do not apply unapproved pesticides over food areas.

Walk your building like an inspector once a week: back alley, dumpster, dry storage corners, and the area behind ice machines. The issues you find first are the ones guests never should.`,
          },
        ],
      },
    ],
    quiz: {
      title: "Food Protection Manager knowledge check",
      passPercent: 80,
      questions: [
        {
          prompt: "Active managerial control is best described as:",
          options: [
            { text: "Waiting for the health inspector to identify problems", isCorrect: false },
            { text: "Deliberately preventing the common risk factors through policy, training, monitoring, and corrective action", isCorrect: true },
            { text: "Assigning all food safety tasks to the dishwasher", isCorrect: false },
            { text: "Posting the Food Code on the wall", isCorrect: false },
          ],
        },
        {
          prompt: "In a HACCP-minded cooling process, what is a typical critical limit?",
          options: [
            { text: "Cool food whenever there is time between services", isCorrect: false },
            { text: "Cool from 135°F to 70°F within 2 hours, then to 41°F within 4 more hours", isCorrect: true },
            { text: "Taste the food to confirm it is no longer hot", isCorrect: false },
            { text: "Place a lid tightly on a full stockpot and refrigerate immediately", isCorrect: false },
          ],
        },
        {
          prompt: "Where should raw poultry be stored in a reach-in cooler?",
          options: [
            { text: "Above ready-to-eat salads so it is easy to grab", isCorrect: false },
            { text: "On the bottom, below ready-to-eat foods", isCorrect: true },
            { text: "Next to ice used for beverages", isCorrect: false },
            { text: "Uncovered, to allow faster cooling of the package", isCorrect: false },
          ],
        },
        {
          prompt: "A server reports that a guest has a peanut allergy. The manager should:",
          options: [
            { text: "Tell the server to “be careful” and keep moving", isCorrect: false },
            { text: "Confirm ingredients, prevent cross-contact, and be honest if the kitchen cannot guarantee the request", isCorrect: true },
            { text: "Remove visible peanuts and send the same plate", isCorrect: false },
            { text: "Offer a discount instead of changing the dish", isCorrect: false },
          ],
        },
        {
          prompt: "Which employee symptom typically requires exclusion from food handling?",
          options: [
            { text: "Mild seasonal allergies with no fever", isCorrect: false },
            { text: "Vomiting or diarrhea", isCorrect: true },
            { text: "A healed scar on the forearm", isCorrect: false },
            { text: "Tiredness after a double shift", isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    slug: "allergen-awareness",
    title: "Allergen Awareness",
    subtitle: "Identify major allergens, stop cross-contact, and communicate clearly with guests.",
    description:
      "Allergic reactions in restaurants are often caused by cross-contact and guesswork, not by a missing recipe card. This course trains cooks and front-of-house staff to take allergen requests seriously: know the major allergens, read labels, isolate preparation, and involve a manager when the kitchen cannot be sure. Suitable as a stand-alone module or as a companion to Food Handler training.",
    audience: "FOH and BOH staff, catering teams, and managers",
    durationHours: 2,
    level: "Foundation",
    priceCents: 3900,
    featured: true,
    accent: "#8A5A12",
    learningOutcomes: [
      "Name the major U.S. food allergens and common menu hiding places",
      "Separate allergy requests from general preferences",
      "Prevent cross-contact on the line, in fryers, and in the dish pit",
      "Use a guest-communication script that does not over-promise",
      "Know when to stop and get a manager",
    ],
    includes: [
      "Scenario-based lessons for FOH and BOH",
      "Short knowledge check (80% to pass)",
      "Certificate of completion",
      "Lifetime access to lesson updates while enrolled",
    ],
    modules: [
      {
        title: "The major food allergens",
        description: "What they are, where they hide, and why reactions can be severe.",
        lessons: [
          {
            title: "Why allergen control is a food-safety control",
            minutes: 8,
            content: `A food allergy is an immune response. For some guests it is a rash. For others it is anaphylaxis — a medical emergency.

There is no safe “little bit” of an allergen for a person with a serious allergy. That is why scraping cheese off a burger or frying allergen-free food in shared oil is not an acceptable control.

### The major U.S. allergens
Milk, eggs, fish, crustacean shellfish, tree nuts, peanuts, wheat, soybeans, and **sesame**.

These ingredients appear in obvious dishes and in less obvious ones: soy sauce, Worcestershire, pesto, milk solids in seasoning blends, egg washes, and sesame on buns.

### Your legal and ethical duty
Menus and recipes should support accurate information. Staff should never invent ingredient lists. If a label or recipe is unclear, the honest answer is “I need to check” — then check.

${brand.name} trains allergen awareness as part of professional service, not as a special-diet inconvenience.`,
          },
          {
            title: "Hidden sources and recipe literacy",
            minutes: 9,
            content: `Most allergen mistakes happen because someone assumed they knew the dish.

### Build a habit of checking
- Read the current recipe and the labels on sauces, spice blends, and prepped items — recipes change.
- Shared prep: a garnish mix might include nuts even if the entrée description does not mention them.
- Fryers and fryer oil are common cross-contact points for fish, shellfish, wheat, and dairy-battered items.
- Beverages and desserts are not exempt. Milk in chai, almond syrup, wheat in a stout, egg in a cocktail foam.

### FOH vs. BOH
Servers collect the request and set the expectation. The kitchen confirms ingredients and plating. Managers own exceptions.

Never say “there are no nuts in it” unless you have verified the dish, the garnishes, the shared equipment, and the bread basket.

### When the answer is no
It is professional to decline a request you cannot control. Offer an alternative that you *can* prepare safely, or recommend the guest choose another item. Guesses injure people.`,
          },
        ],
      },
      {
        title: "Stopping cross-contact",
        description: "The physical habits that keep an allergen off a plate that should not have it.",
        lessons: [
          {
            title: "Line, fryer, and prep procedures",
            minutes: 10,
            content: `**Cross-contact** is when an allergen moves from one food or surface to another. It is different from the bacterial cross-contamination you already manage — the guest may have a reaction to protein residue you cannot see.

### Practical controls
1. Wash hands and change gloves after handling the allergen and before touching the special order.
2. Use clean, sanitized utensils, boards, pans, and a clean plate. Do not “wipe off” a knife.
3. Prepare the allergen-restricted item in a space that is not actively dusted with flour, cheese, or nut crumbs.
4. Do not use the same fryer oil or pasta water.
5. Cover and separate stored items. Label them.
6. If a mistake happens, discard and restart. Do not pick off the offending garnish.

### Dish pit and expo
A “clean” plate that stacked against a cheesecake is not clean for a milk-allergic guest. Expo must know which ticket is the allergen ticket and keep it from mixing with other plates.

Managers should run a 10-minute allergen drill on slow shifts: pick a ticket, walk the process, and find the weak point.`,
          },
          {
            title: "Talking with guests without over-promising",
            minutes: 8,
            content: `Language matters. Guests with allergies are often used to being dismissed. Clear, calm communication builds trust and reduces errors.

### A reliable script
1. **Acknowledge:** “Thank you for telling us. We take allergy requests seriously.”
2. **Clarify:** Confirm the allergen(s) and whether it is an allergy or a preference. Do not interrogate someone about the severity in a way that shames them — but do get the facts you need.
3. **Check:** “I am going to confirm ingredients and prep with the kitchen. It may take a few extra minutes.”
4. **Commit only to what is true:** “We can prepare the grilled chicken on a clean pan, without the butter baste, and with steamed vegetables from a separate pot.”
5. **Stop if needed:** “We cannot guarantee that item because it shares a fryer with breaded seafood. May I suggest…?”

### Never
- Joke about allergies
- Promise “zero risk” unless you truly control the process
- Rely on a new trainee to wing it during a rush

Document repeat catering or banquet allergy needs in the event packet. The person who took the original call may not be working service.

When in doubt, get a manager. That sentence is the entire course, applied under pressure.`,
          },
        ],
      },
    ],
    quiz: {
      title: "Allergen Awareness knowledge check",
      passPercent: 80,
      questions: [
        {
          prompt: "Which of the following is a major U.S. food allergen?",
          options: [
            { text: "Sesame", isCorrect: true },
            { text: "Strawberries", isCorrect: false },
            { text: "Red food coloring", isCorrect: false },
            { text: "Black pepper", isCorrect: false },
          ],
        },
        {
          prompt: "A guest asks for a dish “without peanuts.” The cook removes the peanut garnish and sends the same salad. This is:",
          options: [
            { text: "Acceptable if the guest did not mention anaphylaxis", isCorrect: false },
            { text: "Unsafe because of likely cross-contact on the same salad", isCorrect: true },
            { text: "Required by FIFO", isCorrect: false },
            { text: "Only a problem for tree nuts, not peanuts", isCorrect: false },
          ],
        },
        {
          prompt: "The safest response when you cannot verify ingredients is:",
          options: [
            { text: "“It should be fine.”", isCorrect: false },
            { text: "“I need to check with the kitchen / a manager, and I will not guess.”", isCorrect: true },
            { text: "“We have never had a problem.”", isCorrect: false },
            { text: "Ignore the request if the ticket is already in the window", isCorrect: false },
          ],
        },
        {
          prompt: "Shared fryer oil is a concern for allergen control because:",
          options: [
            { text: "Oil temperature will be too low", isCorrect: false },
            { text: "Allergen proteins can transfer through the oil to other foods", isCorrect: true },
            { text: "It only matters for vegetarian guests", isCorrect: false },
            { text: "Health departments ban all fryers", isCorrect: false },
          ],
        },
        {
          prompt: "Who should own an allergy ticket during a rush?",
          options: [
            { text: "Whoever is closest to the expo window", isCorrect: false },
            { text: "A designated cook/manager following a defined procedure, with FOH confirming the request", isCorrect: true },
            { text: "The guest, by inspecting the plate in the restroom", isCorrect: false },
            { text: "The dishwasher", isCorrect: false },
          ],
        },
      ],
    },
  },
];
