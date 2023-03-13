import { useState } from "react";
import { Avatar } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import CommonSwitch from "components/CommonSwitch";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledIconButton,
  StyledTableCell,
} from "./StyledComponents"; // ========================================================================

// ========================================================================
const CategoryRow = ({ item, selected }) => {
  const { image, name, level, featured, id } = item;
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(name) !== -1;
  return (
    <StyledTableRow tabIndex={-1} role='checkbox' selected={isItemSelected}>
      <StyledTableCell align='left'>#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align='left'>
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align='left'>
        <Avatar
          src={image}
          sx={{
            borderRadius: "8px",
          }}
        />
      </StyledTableCell>

      <StyledTableCell align='left'>{level}</StyledTableCell>

      <StyledTableCell align='left'>
        <CommonSwitch
          color='info'
          checked={featuredCategory}
          onChange={() => setFeaturedCategory(state => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align='center'>
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CategoryRow;
