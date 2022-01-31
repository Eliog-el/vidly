const validateObjectId = require("../middleware/validateObjectId");
const { Customer, validateCustomer } = require("../models/customer");
const validate = require("../middleware/validate");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", validate(validateCustomer), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("Customer already registered.");

  customer = new Customer(
    _.pick(req.body, ["name", "email", "password", "phone", "isGold"])
  );

  await customer.save();

  res.send(customer);
});

router.put(
  "/:id",
  [validateObjectId, validate(validateCustomer)],
  async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { new: true }
    );

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  }
);

router.delete(
  "/:id",
  [validateObjectId, validate(validateCustomer)],
  async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  }
);

router.get(
  "/:id",
  [validateObjectId, validate(validateCustomer)],
  async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  }
);

module.exports = router;
