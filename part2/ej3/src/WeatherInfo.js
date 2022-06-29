export const WeatherInfo = ({ data }) => {
  //   console.log("dentro del componente", data);
  const current = data.current;
  const weatherIcons = current.weather_icons.map((icon) => {
    return <img key={icon} alt="weather icon" src={icon} />;
  });

  return (
    <>
      <div>temperature: {current.temperature}</div>
      <div>{weatherIcons}</div>
      <div>
        wind: {current.wind_speed} mph {current.wind_dir}
      </div>
      <div></div>
    </>
  );
};
