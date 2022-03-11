// Write your "actions" router here!
const express = require("express");
const {
  logger,
  validateActionId,
  validateActionBody,
  validateProjectExists,
} = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", logger, (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch({ message: "error retrieving actions" });
});

router.get("/:id", validateActionId, logger, (req, res) => {
  res.status(200).json(req.action);
});

router.post(
  "/",
  validateActionBody,
  validateProjectExists,
  logger,
  (req, res, next) => {
    Actions.insert(req.body)
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  validateActionId,
  validateActionBody,
  validateProjectExists,
  logger,
  (req, res, next) => {
    Actions.update(req.params.id, req.body)
      .then((updatedAction) => {
        res.status(202).json(updatedAction);
      })
      .catch(next);
  }
);

router.delete("/:id", validateActionId, logger, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(204).json({});
    })
    .catch(next);
});

module.exports = router;
