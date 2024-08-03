export const getSender = (loggedUser, users) => {
  if (users && loggedUser) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  }
};
