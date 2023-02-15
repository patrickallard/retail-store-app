package net.yorksolutions.optumfsjavadukesofyork2.services;


import net.yorksolutions.optumfsjavadukesofyork2.models.Shipment;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.ShipmentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShipmentService {

    // all connected repositories

    private final ShipmentRepository shipmentRepository;


    public ShipmentService(ShipmentRepository repository) {
        this.shipmentRepository  = repository;
    }

    // logics to fns

    public Iterable <Shipment> getAllShipment() {
        return shipmentRepository.findAll();
    }

    public Shipment addNewShipment(Shipment shipment) throws Exception {
//        if (productRepository.findById(shipment.productId).isPresent())
//            throw new Exception();

        return shipmentRepository.save(shipment);
    }


    public Shipment updateShipment(Long id, Shipment shipment) throws Exception {
//        if (productRepository.findById(shipment.productId).isEmpty())
//            throw new Exception();
        final var updatedShipment = shipmentRepository.findById(id).orElseThrow();
        updatedShipment.productId = shipment.productId;
        updatedShipment.quantity = shipment.quantity;
        updatedShipment.cost = shipment.cost;
        updatedShipment.date = shipment.date;

        return shipmentRepository.save(updatedShipment);
    }


    public void cancelShipment( Long id) throws Exception {
        Optional <Shipment> shipmentToCancel= this.shipmentRepository.findById(id);
        if (shipmentToCancel.isEmpty()) {

            throw new Exception();
        }
        shipmentRepository.deleteById(id);
    }







}
