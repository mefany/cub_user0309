import { useState, useEffect } from "react";
import { Person } from "@mui/icons-material";
import { Button, useMediaQuery, } from "@mui/material";
import TableRow from "components/TableRow";
import { Small } from "components/Typography";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "api/cubApi";

const Profile = () => {
    let user_id
    const [user, setUser] = useState(null);

    useEffect(() => {
        user_id = sessionStorage.getItem("user_uid")
        getUserInfo(user_id)
    }, []);

    const getUserInfo = async (user_id) => {
        const response = await api.UserInfo(user_id);
        setUser(response);
    };
    const downMd = useMediaQuery((theme) => theme.breakpoints.down("md")); // SECTION TITLE HEADER LINK

    const HEADER_LINK = (
        <Button
            color="primary"
            sx={{
                px: 4,
                bgcolor: "primary.light",
            }}
        >
            정보 수정
        </Button>
    );

    return (
        <CustomerDashboardLayout>
            {/* TITLE HEADER AREA */}
            <UserDashboardHeader
                icon={Person}
                title="내 정보"
                button={HEADER_LINK}
                navigation={<CustomerDashboardNavigation />}
            />

            {/* USER PROFILE INFO */}
            {user && (
                <TableRow
                    sx={{
                        cursor: "auto",
                        p: "0.75rem 1.5rem",
                        ...(downMd && {
                            alignItems: "start",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                        }),
                    }}
                >
                    <TableRowItem title="닉네임" value={user.nickname} />
                    <TableRowItem title="유저코드" value={user.user_uid} />
                    <TableRowItem title="이메일" value={user.email} />
                    <TableRowItem title="연락처" value={user.phone === null ? user.phone : '-'} />
                </TableRow>
            )}
        </CustomerDashboardLayout>
    );
};

const TableRowItem = ({ title, value }) => {
    return (
        <FlexBox flexDirection="column" p={1}>
            <Small color="grey.600" mb={0.5} textAlign="left">
                {title}
            </Small>
            <span>{value}</span>
        </FlexBox>
    );
};

export default Profile;
