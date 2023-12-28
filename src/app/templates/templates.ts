export const todosTemplate: TemplateProps = {
  type: "todos",
  title: "To Dos",
  description:
    "Efficiently manage your tasks with the To Dos Template. Customize columns, and effortlessly move tasks through different stages with a simple drag-and-drop interface. Stay organized and boost productivity with this intuitive task management tool.",
  columns: [
    {
      title: "Todo",
      tasks: [
        { content: "Visit the projects page to see all your projects" },
        { content: "Change your preferences in the preferences page" },
        { content: "Add a board to favorites" },
      ],
    },
    {
      title: "In Progress",
      tasks: [
        { content: "Explore KanvaBoard" },
        {
          content: "Clone a template by clicking on the 'Get Template' button",
        },
      ],
    },
    {
      title: "Done",
      tasks: [{ content: "Sign up on KanvaBoard!" }, { content: "Be cool!" }],
    },
  ],
};

export const weeklyPlannerTemplate: TemplateProps = {
  type: "weeklyPlanner",
  title: "Weekly Planner",
  description:
    "Streamline your weekly planning with the Weekly Planner template Visualize your week, prioritize tasks, and boost productivity with this user-friendly template.",
  columns: [
    {
      title: "Done",
      tasks: [{ content: "All the tasks you've finished" }],
    },
    {
      title: "Monday",
      tasks: [{ content: "Task for Monday" }],
    },
    {
      title: "Tuesday",
      tasks: [{ content: "Task for Tuesday" }],
    },
    {
      title: "Wednesday",
      tasks: [{ content: "Task for Wednesday" }],
    },
    {
      title: "Thursday",
      tasks: [{ content: "Task for Thursday" }],
    },
    {
      title: "Friday",
      tasks: [{ content: "Task for Friday" }],
    },
    {
      title: "Saturday",
      tasks: [{ content: "Task for Saturday" }],
    },
    {
      title: "Sunday",
      tasks: [{ content: "Task for Sunday" }],
    },
  ],
};
