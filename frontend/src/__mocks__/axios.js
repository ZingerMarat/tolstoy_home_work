const mockAxios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: {
    withCredentials: true,
  },
};

export default mockAxios;
