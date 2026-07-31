require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const mongoose = require("mongoose");
const Client   = require("../models/Client");
const Employee = require("../models/Employee");
const Mapping  = require("../models/Mapping");
const Trade    = require("../models/Trade");

// ─── helpers ───────────────────────────────────────────────────────────────

const firstNames = [
    "Rahul","Priya","Amit","Rohit","Neha","Vikram","Pooja","Arjun","Sunita","Rajesh",
    "Deepak","Anita","Suresh","Kavita","Manish","Ritu","Sanjay","Meera","Arun","Nisha",
    "Ravi","Shweta","Dinesh","Preeti","Manoj","Seema","Vinod","Rekha","Ashok","Geeta",
    "Ramesh","Usha","Mahesh","Savita","Sunil","Poonam","Anil","Bharti","Naresh","Lalita",
    "Vinay","Kamla","Harish","Pushpa","Mohan","Saroj","Sushil","Asha","Girish","Jyoti"
];

const lastNames = [
    "Sharma","Patel","Singh","Kumar","Verma","Gupta","Mehta","Shah","Chopra","Malhotra",
    "Bose","Chatterjee","Iyer","Nair","Reddy","Rao","Pillai","Banerjee","Joshi","Desai",
    "Trivedi","Kapoor","Khanna","Sinha","Tiwari","Pandey","Mishra","Dubey","Yadav","Chaudhary"
];

const employeeNames = [
    "John","Sarah","Aditya","Priya","Rahul","Sneha","Vikash","Anjali","Rohan","Divya",
    "Karan","Pooja","Aryan","Nisha","Siddharth","Meera","Ayush","Kavya","Raj","Simran"
];

const departments = ["Operations","Support","Sales","Research","Compliance"];

const bseSymbols = [
    "TCS","INFY","RELIANCE","HDFCBANK","ICICIBANK","WIPRO","BAJFINANCE",
    "HCLTECH","AXISBANK","SBIN","TATAMOTORS","MARUTI","SUNPHARMA",
    "NESTLEIND","POWERGRID","NTPC","ONGC","COALINDIA","BHARTIARTL","ADANIPORTS"
];

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randInt(min, max)  { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randItem(arr)      { return arr[randInt(0, arr.length - 1)]; }

/** Deterministic PAN from index — guarantees uniqueness */
function makePAN(i) {
    // format: 3 alpha + P + 1 alpha + 4 digits + 1 alpha  (standard individual PAN)
    const a = ALPHA[i % 26];
    const b = ALPHA[Math.floor(i / 26) % 26];
    const c = ALPHA[(i * 3) % 26];
    const d = ALPHA[(i * 7) % 26];
    const num = String(i + 1000).slice(-4);      // always 4 digits
    const e = ALPHA[(i * 13) % 26];
    return `${a}${b}${c}P${d}${num}${e}`;
}

function randomDate(start, end) {
    const ms = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(ms).toISOString().split("T")[0];
}

// ─── generate ──────────────────────────────────────────────────────────────

const CLIENT_COUNT   = 200;
const EMPLOYEE_COUNT = 20;
const TRADE_COUNT    = 2000;

const clients = Array.from({ length: CLIENT_COUNT }, (_, i) => ({
    id:   i + 1,
    name: `${randItem(firstNames)} ${randItem(lastNames)}`,
    pan:  makePAN(i),
}));

const employees = Array.from({ length: EMPLOYEE_COUNT }, (_, i) => ({
    id:         i + 1,
    name:       employeeNames[i],
    department: departments[i % departments.length],
}));

// Round-robin: client 1→emp1, client 2→emp2, …, client 21→emp1, etc.
const mappings = clients.map(client => ({
    clientId:   client.id,
    employeeId: ((client.id - 1) % EMPLOYEE_COUNT) + 1,
}));

const tradeStart = new Date("2025-01-01");
const tradeEnd   = new Date("2026-07-30");

const trades = Array.from({ length: TRADE_COUNT }, (_, i) => ({
    tradeId:  1000 + i + 1,
    clientId: randInt(1, CLIENT_COUNT),
    symbol:   randItem(bseSymbols),
    quantity: randInt(1, 500),
    date:     randomDate(tradeStart, tradeEnd),
}));

// ─── seed ──────────────────────────────────────────────────────────────────

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB Atlas");

        await Client.deleteMany({});
        await Employee.deleteMany({});
        await Mapping.deleteMany({});
        await Trade.deleteMany({});
        console.log("🗑️  Cleared existing collections");

        await Client.insertMany(clients);
        console.log(`✅ Inserted ${clients.length} clients`);

        await Employee.insertMany(employees);
        console.log(`✅ Inserted ${employees.length} employees`);

        await Mapping.insertMany(mappings);
        console.log(`✅ Inserted ${mappings.length} mappings`);

        await Trade.insertMany(trades);
        console.log(`✅ Inserted ${trades.length} trades`);

        console.log("\n🎉 Seed complete!");
        console.log(`   Clients: ${clients.length} | Employees: ${employees.length} | Mappings: ${mappings.length} | Trades: ${trades.length}`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed error:", err.message);
        process.exit(1);
    }
};

seed();
