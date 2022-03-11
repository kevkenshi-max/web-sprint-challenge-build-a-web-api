// add middlewares here related to projects
const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleString()} ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const validProject = await Projects.get(req.params.id);
    if (!validProject) {
      next({ status: 404, message: "project not found" });
    } else {
      req.project = validProject;
      next();
    }
  } catch (err) {
    next({ message: "validating project ID error" });
  }
}

function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (!name || !name.trim()) {
    next({ status: 400, message: "missing required name" });
  } else if (!description || !description.trim()) {
    next({ status: 400, message: "missing required description" });
  } else {
    next();
  }
}

function completedCheck(req, res, next) {
  const { completed } = req.body;
  if (typeof completed !== "boolean") {
    next({ status: 400, message: "missing completion status" });
  } else {
    next();
  }
}

module.exports = {
  logger,
  validateProjectId,
  validateProjectBody,
  completedCheck,
};
