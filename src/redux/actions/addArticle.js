const actions = {
  addArticle: (payload) => {
    return {
      type: 'ADD_ARTICLE',
      _id: payload._id,
      title: payload.title,
      content: payload.content,
      author: payload.author,
      date: payload.date
    };
  }
};

export default actions