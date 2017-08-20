export function article(state=[], action) {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return [...state, {
        _id: action._id,
        title: action.title,
        content: action.content,
        author: action.author,
        date: action.date,
      }];
    default:
      return state;
  }
}