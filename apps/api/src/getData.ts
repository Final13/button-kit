export default async function handler(req, res) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    res.status(200).json({ status: 200, data: 'ok', error: null });
  } else {
    res.status(500).json({
      status: 500,
      data: 'fail',
      error: { message: 'Something went wrong, please try again' },
    });
  }
}
