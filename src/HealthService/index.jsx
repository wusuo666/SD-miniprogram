import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { Button } from "@taroify/core";
import { ArrowLeft, Phone, LocationOutlined, Clock } from "@taroify/icons";
import { getMedicalServices } from "../api/healthService";
import "./index.scss";

// 默认模拟数据，API 未就绪时作为兜底
const DEFAULT_STATIONS = [
  {
    id: 1,
    name: "上地街道社区卫生服务中心",
    address: "北京市海淀区上地东路5号",
    phone: "010-82886688",
    latitude: 40.0355,
    longitude: 116.3184,
    service_time: "周一至周五 08:00-17:00",
  },
  {
    id: 2,
    name: "清河社区卫生服务站",
    address: "北京市海淀区清河中街68号",
    phone: "010-62987766",
    latitude: 40.0392,
    longitude: 116.3346,
    service_time: "周一至周六 08:30-17:30",
  },
  {
    id: 3,
    name: "西三旗社区卫生服务站",
    address: "北京市海淀区西三旗建材西路2号",
    phone: "010-82900123",
    latitude: 40.0488,
    longitude: 116.3535,
    service_time: "周一至周五 08:00-18:00",
  },
];

export default function HealthService() {
  const [stations, setStations] = useState(DEFAULT_STATIONS);

  useEffect(() => {
    getMedicalServices()
      .then((res) => {
        if (res?.medical_services?.length > 0) {
          setStations(res.medical_services);
        }
      })
      .catch(() => {
        // API 未就绪，使用默认数据
      });
  }, []);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handleCall = (phone) => {
    Taro.makePhoneCall({ phoneNumber: phone });
  };

  const handleLocation = (station) => {
    Taro.openLocation({
      name: station.name,
      address: station.address,
      latitude: station.latitude,
      longitude: station.longitude,
      scale: 18,
    });
  };

  return (
    <View className="health-service-page">
      {/* 头部导航 */}
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <ArrowLeft size={20} />
            <Text>返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">卫生服务中心</Text>
          <Text className="subtitle">为您提供便捷的医疗服务</Text>
        </View>
      </View>

      {/* 卫生服务站列表 */}
      <View className="station-list">
        {stations.map((station) => (
          <View className="station-card" key={station.id}>
            {/* 名称 */}
            <View className="station-name">
              <Text className="name-icon">🏥</Text>
              <Text className="name-text">{station.name}</Text>
            </View>

            {/* 地址 */}
            <View className="station-info-row">
              <LocationOutlined size="16" color="#ff7a2e" />
              <Text className="info-text">{station.address}</Text>
            </View>

            {/* 联系电话 */}
            <View className="station-info-row">
              <Phone size="16" color="#ff7a2e" />
              <Text className="info-text">{station.phone}</Text>
            </View>

            {/* 服务时间 */}
            <View className="station-info-row">
              <Clock size="16" color="#ff7a2e" />
              <Text className="info-text">{station.service_time}</Text>
            </View>

            {/* 操作按钮 */}
            <View className="station-actions">
              <Button
                className="action-btn call-btn"
                color="warning"
                shape="round"
                size="small"
                onClick={() => handleCall(station.phone)}
              >
                <Phone size={16} style={{ marginRight: 4 }} />
                立即拨打
              </Button>
              <Button
                className="action-btn location-btn"
                color="warning"
                variant="outlined"
                shape="round"
                size="small"
                onClick={() => handleLocation(station)}
              >
                <LocationOutlined size={16} style={{ marginRight: 4 }} />
                查看位置
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
