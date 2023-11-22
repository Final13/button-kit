const getColor = (status:  number | undefined, classname: boolean) => {
  if (status === undefined) {
    if (classname) return 'common';
    return '#3498db';
  } else if (status === 200) {
    if (classname) return 'success';
    return '#3CB371';
  } else if (status >= 400) {
    if (classname) return 'error';
    return '#FF6347';
  } else {
    if (classname) return 'common';
    return '#3498db';
  }
};

export default getColor;
