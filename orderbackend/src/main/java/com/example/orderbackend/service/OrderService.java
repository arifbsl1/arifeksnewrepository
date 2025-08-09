package com.example.orderbackend.service;

import com.example.orderbackend.dto.OrderDto;
import com.example.orderbackend.exception.ResourceNotFoundException;
import com.example.orderbackend.model.Order;
import com.example.orderbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    public Order createOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setProductName(orderDto.getProductName());
        order.setQuantity(orderDto.getQuantity());
        order.setPrice(orderDto.getPrice());
        order.setOrderCreateDate(LocalDate.now());
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, OrderDto orderDetails) {
        Order order = getOrderById(id);
        order.setProductName(orderDetails.getProductName());
        order.setQuantity(orderDetails.getQuantity());
        order.setPrice(orderDetails.getPrice());
        order.setOrderUpdateDate(LocalDate.now());
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }
}