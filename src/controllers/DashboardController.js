const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };    
    //total de horas por dia de cada job em progresso
    let jobTotalHours = 0;
    //contador de projetos
    let jobNumberList = 0;

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      //contando os status
      statusCount[status] += 1;
      //calculando gasto de horas por dia de todos os projetos que estão em andamento
      jobTotalHours = status ==='progress' ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours
      //interando ao contador de projetos
      jobNumberList += 1;

      return {
        ...job,
        remaining,
        status,
        jobNumberList,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    //calculo de horas livres no dia
    //quantidade de horas que quero trabalhar MENOS quantidade de horas/dia de cada job em progresso
    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours
    });
  },
};
