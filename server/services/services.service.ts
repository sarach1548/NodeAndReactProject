import { Services } from "../models/services";
import sequelize from "../dataAccess/dataAccess";
import { CustomError } from "../errors/CustomError";
import { hasMinimumLetters, isValidServiceCost, isValidServiceDuration } from "../validators/validators";

export async function addService(newService: Services) {
 
    if (!newService.serviceName || !newService.serviceDescription || !newService.serviceCost || !newService.serviceDuration) {
        throw new CustomError('Missing required fields', 400);
    }
    if (!hasMinimumLetters(newService.serviceName)) {
        throw new CustomError('Service name must contain at least 2 letters', 400);
    }
    if (!isValidServiceCost(newService.serviceCost)) {
        throw new CustomError('Service cost must be at least 50 NIS', 400);
    }
    if (!isValidServiceDuration(newService.serviceDuration)) {
        throw new CustomError('Service duration must be at least 10 minutes', 400);
    }

    await sequelize.authenticate();
    await Services.sync();
    const existingService = await Services.findOne({
        where: { serviceName: newService.serviceName }
    });

    if (existingService) {
        throw new CustomError('A service with the same name already exists', 400);
    }
    const service = await Services.create({
        serviceName: newService.serviceName,
        serviceDescription: newService.serviceDescription,
        serviceCost: newService.serviceCost,
        serviceDuration: newService.serviceDuration
    });

    const result = await Services.findByPk(service.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return result;
}



export async function updateService(serviceId: number, updatedService: Services) {
  if (!updatedService.serviceName || !updatedService.serviceDescription || !updatedService.serviceCost || !updatedService.serviceDuration) {
        throw new CustomError('Missing required fields', 400);
    }
    if (!hasMinimumLetters(updatedService.serviceName)) {
        throw new CustomError('Service name must contain at least 2 letters', 400);
    }
    if (!isValidServiceCost(updatedService.serviceCost)) {
        throw new CustomError('Service cost must be at least 50 NIS', 400);
    }
    if (!isValidServiceDuration(updatedService.serviceDuration)) {
        throw new CustomError('Service duration must be at least 10 minutes', 400);
    }
    const service = await Services.findOne({
        where: { id: serviceId }
    });

    if (!service) {
        throw new CustomError('service not found', 404);
    }

    const existingService = await Services.findOne({
        where: { serviceName: updatedService.serviceName }
    });

    if (existingService&&existingService.id!=serviceId) {
        throw new CustomError('A service with the same name already exists', 400);
    }
    await service.update(updatedService);

    const { createdAt, updatedAt, ...result } = service.get();

    return result;

}

export async function getServices() {
    const services = await Services.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return services;
}
export async function deleteService(serviceId: number) {

    const service = await Services.findByPk(serviceId);

    if (!service) {
        throw new CustomError('Service not found', 404);
    }

    await service.destroy();
    return `service ${serviceId} deleted successfully`

}

