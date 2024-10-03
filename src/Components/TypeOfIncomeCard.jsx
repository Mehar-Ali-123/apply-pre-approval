export const TypeOfIncomeCard = ({ link, imageSrc, title, alt }) => {
  return (
    <a className="income-types-item" href={link}>
      <img src={imageSrc} alt={alt} />
      <h2 style={{ background: "none", paddingTop: "8px" }}>{title}</h2>
    </a>
  );
};
