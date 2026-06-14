const calculateJobReadinessScore = ({
  atsScore,
  githubScore,
  skillsCount,
  careerGoal,
}) => {
  const resumeWeight = 0.4;
  const githubWeight = 0.3;
  const skillsWeight = 0.2;
  const goalWeight = 0.1;

  const skillScore = Math.min(skillsCount * 10, 100);
  const goalScore = careerGoal ? 100 : 0;

  const finalScore =
    atsScore * resumeWeight +
    githubScore * githubWeight +
    skillScore * skillsWeight +
    goalScore * goalWeight;

  return Math.round(finalScore);
};

module.exports = {
  calculateJobReadinessScore,
};
