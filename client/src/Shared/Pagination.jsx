/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/features/filter/filterSlice";
import { ConfigProvider, Pagination } from "antd";

const CPagination = ({meta}) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.filter.page);

    return (
        <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: '#ece07f',
                  itemLinkBg: '#f0f0f0',
                  itemLinkHoverBg: '#d9d9d9',
                },
              },
            }}
          >
            <Pagination 
              current={currentPage}
              align="center"
              onChange={(value) => dispatch(setPage(value))}
              pageSize={meta?.limit}
              total={meta?.total}
            />
          </ConfigProvider>
    );
};

export default CPagination;