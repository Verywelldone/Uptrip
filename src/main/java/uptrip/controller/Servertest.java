package uptrip.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/servertest")
public class Servertest {

    @RequestMapping("")
    public String test() {
        return "Success!";
    }
}
