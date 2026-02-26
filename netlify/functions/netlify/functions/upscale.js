exports.handler = async function (event) {
  const fetch = (await import("node-fetch")).default;

  try {
    const body = JSON.parse(event.body);
    const imageUrl = body.image;

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "db21e45e8d1b2b0b4b7f7e9c8e0f9f4f5b7a1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
        input: {
          image: imageUrl,
          scale: 2
        }
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
