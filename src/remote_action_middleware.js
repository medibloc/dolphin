export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
    console.log('emitted in middleware', action);
  }
  return next(action);
}
