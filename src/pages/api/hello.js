import axios from 'axios';

const getWhoSampled = async () => {
  try {
    return await axios.get('https://randomuser.me/api/');
  } catch (error) {
    console.error(error);
  }
};

export default async (req, res) => {
  const result = await getWhoSampled();

  if (result) {
    const data = result.data.results;
    res.status(200).json({ data });
  }
};
