const { Country, Activity } = require("../db.js");

const databaseActivity = async (req, res, next) => {
  try {
    return await Activity.findAll({ include: Country });
  } catch (error) {
    next(error);
  }
};

const getActivity = async (req, res, next) => {
  const { name } = req.query;
  // Aun no puedo testearlo porque aun no tengo activities

  const AllActivities = await databaseActivity();
  try {
    if (name) {
      const nameA = await AllActivities.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      nameA.length ? res.status(200).send(nameA) : res.status(204).send([]);
    } else {
      res.status(200).send(AllActivities);
    }
  } catch (error) {
    console.log(error);
  }
};

const getOneActivity = async (req, res, next) => {
  const { id } = req.params;
  const AllActivities = await databaseActivity();

  try {
    if (id) {
      const activityId = await AllActivities.filter((e) => e.id == id);
      return res.status(200).json(activityId);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createActivity = async (req, res, next) => {
  const activity = req.body;

  console.log(activity);
  if (activity) {
    try {
      const data = {
        name: activity.name,
        difficulty: activity.difficulty,
        duration: parseInt(activity.duration),
        info: activity.info,
        image: activity.image,
        season: activity.season,
      };

      const created = await Activity.create(data);

      activity.countries.forEach(async (e) => {
        let findorcreteId = await Country.findAll({ where: { id: e } });

        if (findorcreteId) {
          created.addCountry(e);
        }
      });

      res.status(200).send("All ok");
    } catch (error) {
      next(error);
    }
  } else {
    res.send("No Content");
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  Activity.destroy({ where: { id } })
    .then(() => {
      return res.status(200).send("Activity succesfully removed");
    })
    .catch((error) => {
      res.status(404);
      next(error);
    });
};

module.exports = {
  getActivity,
  getOneActivity,
  deleteActivity,
  createActivity,
};
