# BAD BRIDGE #

class NotificationType
  def send(message)
    raise NotImplementedError
  end
  end

 class Email < NotificationType
   def send(message)
     puts "Sendig Email #{message}"
   end
    class SMS < NotificationType
      def send(message)
        puts "Sending SMS: #{message}"
      end

    class Push < NotificationType
      puts "Sending Push: #{message}"
    end
  end
end

notif = Notification.new(:email)
notif.send("Hello World")


# BAD SINGLETONE #

require 'singleton'

class AppConfig
  include Singleton

  def initialize
    @settings = { env: "production" }
  end


  def [](key)
    @settings[key]
  end
end

c1 = AppConfig.instance
c2 = AppConfig.instance

puts c1.object_id == c2.object_id  # false 🤦‍♂️



# BAD STRATEGY #

require 'ostruct'

class ShippingStrategy
  def calculate_cost(weight)
    raise NotImplementedError, "Subclasses must implement calculate_cost"
  end
end

class FedExStrategy < ShippingStrategy
  def calculate_cost(weight)
    weight * 10 + 15
  end
end

class AramexStrategy < ShippingStrategy
  def calculate_cost(weight)
    weight * 8 + 10
  end
end

class DHLStrategy < ShippingStrategy
  def calculate_cost(weight)
    weight * 12 + 20
end

class ShippingStrategyFactory
  STRATEGIES = {
    fedex: FedExStrategy,
    aramex: AramexStrategy,
    dhl: DHLStrategy
  }

  def self.create(strategy_name)
    strategy_class = STRATEGIES[strategy_name]
    raise "Unknown shipping strategy: #{strategy_name}" unless strategy_class
    strategy_class.new
  end
end

class ShippingCalculator
  def initialize(shipping_strategy)
    @shipping_strategy = shipping_strategy
  end

  def calculate(order)
    @shipping_strategy.calculate_cost(order.weight)
  end
end
