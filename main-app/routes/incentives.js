const express = require("express");
const router  = express.Router();
const { readCache } = require("../services/dashboardService");

/** Compute incentive for one employee given cache data */
function computeIncentive(employee, mappings, trades) {
    const clientIds = mappings
        .filter(m => m.employeeId == employee.id)
        .map(m => m.clientId);

    const myTrades     = trades.filter(t => clientIds.includes(t.clientId));
    const totalQuantity = myTrades.reduce((sum, t) => sum + t.quantity, 0);

    return {
        employeeId:    employee.id,
        employeeName:  employee.name,
        totalTrades:   myTrades.length,
        totalQuantity,
        incentive:     totalQuantity * 10,
    };
}

// GET /incentives — management view: all employees
router.get("/", async (req, res) => {
    const cache = await readCache();
    console.log("📦 Returning incentives for all employees");
    const all = cache.employees.map(emp =>
        computeIncentive(emp, cache.mappings, cache.trades)
    );
    res.json(all);
});

// GET /incentives/:employeeId — individual employee view
router.get("/:employeeId", async (req, res) => {
    const { employeeId } = req.params;
    const cache = await readCache();
    console.log(`📦 Returning incentive for employee ${employeeId}`);

    const employee = cache.employees.find(e => e.id == employeeId);
    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }

    res.json(computeIncentive(employee, cache.mappings, cache.trades));
});

module.exports = router;
