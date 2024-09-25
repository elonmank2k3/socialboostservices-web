package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.model.Proxy;
import socialboostservices.repository.ProxyRepository;

import java.util.List;

@RestController
@RequestMapping("/api/proxies")
public class ProxyController {
    @Autowired
    ProxyRepository proxyRepository;

// Không ảnh + không DTO, có thể dùng RequestBody
    @PostMapping
    public ResponseEntity<String> addProxy(
            @RequestBody Proxy proxy
    ) {
        proxyRepository.save(proxy);
        int maxId = proxyRepository.findMaxId();
        return ResponseEntity.ok("Add Proxy id " + maxId + " successfully");
    }

    @GetMapping
    public ResponseEntity<List> getAllProxies() {
        return ResponseEntity.ok(proxyRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editProxy(
            @PathVariable(value = "id") Long id,
            @RequestBody Proxy proxy
    ) {
        Proxy p = proxyRepository.findById(id).orElse(null);

        if (p == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proxy " + id + " not found");

        p.setHost(proxy.getHost());
        p.setPort(proxy.getPort());
        p.setUsername(proxy.getUsername());
        p.setPassword(proxy.getPassword());
        p.setProtocol(proxy.getProtocol());
        p.setExclusivity(proxy.getExclusivity());
        p.setOrigin(proxy.getOrigin());
        p.setRotation(proxy.getRotation());
        p.setVersion(proxy.getVersion());
        p.setStatus(proxy.getStatus());
        p.setSellerInfo(proxy.getSellerInfo());

        proxyRepository.save(p);
        return ResponseEntity.ok("Edit proxy " + id + " successfully");
    }

    @GetMapping("/max-id")
    public Integer getMaxId() {
        return proxyRepository.findMaxId();
    }
}
