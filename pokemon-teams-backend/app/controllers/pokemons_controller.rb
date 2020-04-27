class PokemonsController < ApplicationController

    def create
        # trainer = Trainer.find_by(id: params[:id])

        pokemon = Pokemon.create({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: params[:trainer_id]
        })

        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

end
