// TODO: complete
class Notifications {
  /** Get notification based on user id */
  getUser = (userId) => [
    {
      id: "abc",
      title:
        "HER MAJESTY'S ATTORNEY GENERAL (RESPONDENT) V CROSLAND (APPELLANT) - THE SUPREME COURT",
      status: "accepted",
    },
    {
      id: "abc",
      title:
        "HER MAJESTY'S ATTORNEY GENERAL (RESPONDENT) V CROSLAND (APPELLANT) - THE SUPREME COURT",
      status: "rejected",
    },
    {
      id: "abc",
      title:
        "HER MAJESTY'S ATTORNEY GENERAL (RESPONDENT) V CROSLAND (APPELLANT) - THE SUPREME COURT",
      status: "pending",
    },
  ];

  /** Get access requests (admin notifications) */
  getAdmin = () => [
    {
      id: "abc",
      title:
        "HER MAJESTY'S ATTORNEY GENERAL (RESPONDENT) V CROSLAND (APPELLANT) - THE SUPREME COURT",
      status: "pending",
    },
    {
      id: "abc",
      title:
        "HER MAJESTY'S ATTORNEY GENERAL (RESPONDENT) V CROSLAND (APPELLANT) - THE SUPREME COURT",
      status: "pending",
    },
    {
      id: "abc",
      title:
        "HER MAJESTY'S ATTORNEY GENERAL (RESPONDENT) V CROSLAND (APPELLANT) - THE SUPREME COURT",
      status: "pending",
    },
  ];
}

const notificationManager = new Notifications();

export default notificationManager;
