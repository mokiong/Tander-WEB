// // check wether subscriptions is yours
// // and the person youre having a chat with
export const isMySubscriptions = (
  myId,
  comparedMyId,
  receiverId,
  comparedReceiverId
) => {
  if (comparedMyId === myId && comparedReceiverId === receiverId) {
    return true;
  } else if (comparedMyId === receiverId && comparedReceiverId === myId) {
    return true;
  } else {
    return false;
  }
};
