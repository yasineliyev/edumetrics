import styles from "./Header.module.css";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/constants";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

const Header = () => {
  const [headerData, setHeaderData] = useState({});
  const [lang, setLang] = useState("AZE");

  const handleChange = (e) => {
    setLang(e.target.value);
  };

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={styles.menuBox}
    >
      <List>
        <Link to="/">ANA SƏHİFƏ</Link>
      </List>

      <List>
        <Link to="/">HAQQIMIZDA</Link>
      </List>
      <List>
        <Link to="/">FƏNNLƏR</Link>
      </List>
      <List>
        <Link to="/">PAKETLƏR</Link>
      </List>
      <List>
        <Link to="/register">QEYDİYYAT</Link>
      </List>
      <List>
        <Link to="/">BLOG</Link>
      </List>
      <List>
        <Link to="/">FAQ</Link>
      </List>
      <List>
        <Link to="/">CONTACT</Link>
      </List>
    </Box>
  );

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const responseHeaderData = await fetch(`${BASE_URL}/api/aze`);
        const resultHeaderData = await responseHeaderData.json();

        setHeaderData(resultHeaderData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeaderData();
  }, []);

  return (
    <>
      <Toolbar className={styles.toolbar}>
        {["left"].map((anchor) => (
          <Fragment key={anchor}>
            <IconButton
              className={styles.menuButton}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 5, ml: 0 }}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              className={styles.menuDrawer}
            >
              {list(anchor)}
            </Drawer>
          </Fragment>
        ))}

        <Link to="/">
          <img
            className={styles.logo}
            src={`${BASE_URL}/api/logo`}
            alt="edumetrics-logo"
          />
        </Link>
        <FormControl sx={{ ml: "auto" }}>
          <Select
            className={`langSelect ${styles.select}`}
            value={lang}
            onChange={handleChange}
          >
            {headerData.languageList &&
              headerData.languageList.map((language, index) => {
                return (
                  <MenuItem
                    key={index}
                    className={`langItem ${styles.menuItem}`}
                    value={language}
                  >
                    <Link
                      to={
                        language === "AZE"
                          ? window.location.href
                          : `${window.location.href}${language.toLowerCase()}`
                      }
                    >
                      {language}
                    </Link>
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Toolbar>
    </>
  );
};

export default Header;
