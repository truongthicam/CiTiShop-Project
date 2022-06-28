import Accordion from "../accordion/Accordion";
import AccordionHeader from "../accordion/AccordionHeader";
import Card from "../Card";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import TextField from "../text-field/TextField";
import { H5, H6, Paragraph, SemiSpan } from "../Typography";

const ProductFilterCard = () => {
  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Danh mục</H6>

      {categroyList.map((item) =>
        item.subCategories ? (
          <Accordion key={item.title} expanded>
            <AccordionHeader
              px="0px"
              py="6px"
              color="text.muted"
              // justifyContent="flex-start"
            >
              <SemiSpan className="cursor-pointer" mr="9px">
                {item.title}
              </SemiSpan>
            </AccordionHeader>
            {item.subCategories.map((name) => (
              <Paragraph
                className="cursor-pointer"
                fontSize="14px"
                color="text.muted"
                pl="22px"
                py="6px"
                key={name}
              >
                {name}
              </Paragraph>
            ))}
          </Accordion>
        ) : (
          <Paragraph
            className="cursor-pointer"
            fontSize="14px"
            color="text.muted"
            py="6px"
            key={item.title}
          >
            {item.title}
          </Paragraph>
        )
      )}

      <Divider mt="18px" mb="24px" />

      <H6 mb="16px">Giá</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" fullwidth />
        <H5 color="text.muted" px="0.5rem">
          -
        </H5>
        <TextField placeholder="250000" type="number" fullwidth />
      </FlexBox>

      <Divider my="24px" />

      <H6 mb="16px">Thương hiệu</H6>
      {brandList.map((item) => (
        <CheckBox
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{item}</SemiSpan>}
          my="10px"
          onChange={(e) => {
            console.log(e.target.value, e.target.checked);
          }}
        />
      ))}

      <Divider my="24px" />

      {otherOptions.map((item) => (
        <CheckBox
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{item}</SemiSpan>}
          my="10px"
          onChange={(e) => {
            console.log(e.target.value, e.target.checked);
          }}
        />
      ))}

      <Divider my="24px" />

      <H6 mb="16px">Đánh giá</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <CheckBox
          key={item}
          value={item}
          color="secondary"
          label={<Rating value={item} outof={5} color="warn" />}
          my="10px"
          onChange={(e) => {
            console.log(e.target.value, e.target.checked);
          }}
        />
      ))}

      <Divider my="24px" />

    
    </Card>
  );
};

const categroyList = [
  {
    title: "Trang điểm",
    subCategories: ["Phấn mắt", "Phấn má hồng", "Son"],
  },
  {
    title: "Tẩy trang",
  },
  {
    title: "Dưỡng thể",
  },
  {
    title: "Nước hoa",
  },
];

const brandList = ["Loreal", "Laroche Posay", "Unilever", "P&G", "De Klairs"];
const otherOptions = ["Đang bán", "Hết hàng", "Nổi bật"];
// const colorList = [
//   "#1C1C1C",
//   "#FF7A7A",
//   "#FFC672",
//   "#84FFB5",
//   "#70F6FF",
//   "#6B7AFF",
// ];

export default ProductFilterCard;
