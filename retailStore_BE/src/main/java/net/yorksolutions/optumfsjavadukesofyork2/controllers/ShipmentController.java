package net.yorksolutions.optumfsjavadukesofyork2.controllers;


import net.yorksolutions.optumfsjavadukesofyork2.models.Shipment;
import net.yorksolutions.optumfsjavadukesofyork2.services.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/shipment")
@CrossOrigin
public class ShipmentController {

    private final ShipmentService service;

    @Autowired
    public ShipmentController(ShipmentService service) {
        this.service = service;
    }

    @GetMapping
    public Iterable <Shipment> getAllShipment () {
       return service.getAllShipment();
    }


    @PostMapping
    public Shipment addNewShipment (@RequestBody Shipment shipment) {
        try {
           return service.addNewShipment(shipment);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE);
        }

    }


    @PutMapping("/{id}")
    public  Shipment updateShipment(@PathVariable Long id, @RequestBody Shipment shipment) {
        try {
            return service.updateShipment(id, shipment);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

    }


    @DeleteMapping("/{id}")
    public void cancelShipment (@PathVariable Long id) {
        try {
            service.cancelShipment(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE);
        }

    }



}
