import '../../styles/Loader.css';

export default function Loader() {
  return (
    <>
      <div className="loader__wrapper">
        <div className="loader__external long">
        </div>
          <div className="loader__internal medium">
          </div>
            <div className="loader__external small">
            </div>
      </div>
    </>
  );
}