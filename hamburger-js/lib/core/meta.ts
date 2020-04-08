function meta(metaObject) {
  return (componentFn) => ({
    meta: metaObject,
    build: (meta) => {
      return componentFn(meta).build();
    },
  });
}

export default meta;
