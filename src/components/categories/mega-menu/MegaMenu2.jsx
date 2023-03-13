import MegaMenu3 from "./MegaMenu3";
import StyledMegaMenu from "./StyledMegaMenu";
import CommonCard from "components/CommonCard";
import CategoryMenuItem from "../CategoryMenuItem"; // =======================================================================

// =======================================================================
const MegaMenu2 = ({ data }) => {
  return (
    <StyledMegaMenu>
      <CommonCard
        elevation={2}
        sx={{
          ml: "1rem",
          py: "0.5rem",
        }}
      >
        {data?.map(item => (
          <CategoryMenuItem
            href={item.href}
            icon={item.icon}
            key={item.title}
            title={item.title}
            caret={!!item.menuData}
          >
            {item.menuData && (
              <MegaMenu3 minWidth='560px' data={item.menuData} />
            )}
          </CategoryMenuItem>
        ))}
      </CommonCard>
    </StyledMegaMenu>
  );
};

export default MegaMenu2;
