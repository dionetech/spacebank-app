import { ImSpinner8 } from "react-icons/im";

const BalanceLoader = ({ loading }) => {
  return (
    <>
      {loading.status !== "success" ? (
        <div className="loadingStatus">
          {loading.loading ? (
            <p className="spin loader">
              <ImSpinner8 />
            </p>
          ) : (
            <>
              {loading.status === "failed" ? (
                <p className="failed">{loading.error}</p>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BalanceLoader;
