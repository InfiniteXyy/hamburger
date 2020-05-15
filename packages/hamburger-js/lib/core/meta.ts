function meta(
  metaObject
): (
  fn: Function
) => {
  meta: any;
  build: (meta: any) => any;
} {
  return (componentFn) => ({
    meta: metaObject,
    build: function (meta) {
      return componentFn.call(this, meta).build();
    },
  });
}

export default meta;
