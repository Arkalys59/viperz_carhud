CreateThread(function()
    local status = {}
    while (true) do
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local streetHash = GetStreetNameAtCoord(playerCoords.x, playerCoords.y, playerCoords.z)
        local streetName = GetStreetNameFromHashKey(streetHash)

        local vehicle = IsPedInAnyVehicle(playerPed) and GetVehiclePedIsIn(playerPed, false) or nil
        local speed = vehicle and GetEntitySpeed(vehicle) * 3.6 or 0
        local forwardSpeed = vehicle and GetEntitySpeedVector(vehicle, true).y or 0
        local gears = vehicle and GetVehicleCurrentGear(vehicle) or 0
        local engineRunning = vehicle and GetIsVehicleEngineRunning(vehicle) or false

        status.fuel = vehicle and GetVehicleFuelLevel(vehicle) or 0
        status.speed = speed
        status.street = streetName

        status.damage = vehicle and (GetVehicleEngineHealth(vehicle) / 10) or 100

        if speed > 0 and engineRunning and forwardSpeed < 0 then
            status.gears = 'R'
        elseif speed == 0 then
            status.gears = 'N'
        else
            status.gears = gears
        end

        SendNUIMessage({
            type = 'update',
            status = status,
            show = vehicle ~= nil,
        })

        Wait(vehicle and 150 or 1000)
    end
end)