import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html',   // ⭐ important
      strict: false             // ⭐ error avoid
    }),
    paths: {
      base: '/dj'               // ⭐ unga repo name
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (message.includes('does not begin with `base`')) {
          return;
        }
        throw new Error(message);
      }
    }
  }
};


export default config;