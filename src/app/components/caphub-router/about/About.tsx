import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import version from "../../../util/version";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: (theme as any).typography.fontFamily,
  color: theme.palette.text.primary,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

const About = () => {
  return (
    <StyledBox>
      <StyledTypography variant="h4" gutterBottom>
        About Caphub
      </StyledTypography>
      <StyledTypography variant="body1" paragraph>
        Caphub is an innovative online platform that connects businesses with
        potential debt lenders. Our mission is to streamline the process of
        securing funding by leveraging advanced algorithms and data analysis to
        efficiently match startups with the most compatible investors.
      </StyledTypography>

      <StyledTypography variant="body1" paragraph>
        To learn more about our services and the Caphub team, please visit our
        website at{" "}
        <StyledLink
          href="https://caphub-group.com"
          target="_blank"
          rel="noreferrer"
        >
          caphub-group.com
        </StyledLink>
        . We look forward to helping your business navigate the complex world of
        debt financing and find the most suitable funding options.
      </StyledTypography>

      <StyledTypography variant="body1" paragraph>
        Client version: ${version}
      </StyledTypography>
    </StyledBox>
  );
};

export default About;
