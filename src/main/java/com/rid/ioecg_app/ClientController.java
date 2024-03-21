package com.rid.ioecg_app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ClientController {

    @RequestMapping("/home/**")
    public String home_subpath() {
        return "home";
    }

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

}