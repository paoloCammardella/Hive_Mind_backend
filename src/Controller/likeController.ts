import { Request } from 'express';
import Like from '../model/Like';
import Idea from '../model/Idea';
import mongoose from 'mongoose';  // Importa mongoose

export class LikeController {
  static async likeIdea(req: Request) {
    try {
      const userID = req.body.user_id;
      const ideaID = req.body.idea_id;
      const upVote = req.body.upVote;  // Cambiato da upvote a upVote
      const downVote = req.body.downVote;  // Cambiato da downvote a downVote

      // Verifica se `ideaID` è una stringa valida per MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(ideaID)) {
        console.error('Invalid idea ID');
        return;
      }

      // Converti l'ideaID in un ObjectId
      const objectId = new mongoose.Types.ObjectId(ideaID);

      // Verifica che `upVote` e `downVote` siano booleani
      if (typeof upVote !== 'boolean' || typeof downVote !== 'boolean') {
        console.error('Invalid upVote or downVote value');
        return;
      }

      // Trova l'idea
      const idea = await Idea.findById(objectId);
      if (!idea) {
        console.error('Idea not found');
        return;
      }

      // Trova il like dell'utente
      let likedIdea = await Like.findOne({ user_id: userID, idea_id: objectId });

      // Se il like non esiste, creane uno nuovo
      if (!likedIdea) {
        likedIdea = new Like({
          user_id: userID,
          idea_id: objectId,
          upVote: false,
          downVote: false
        });
      }

      // Aggiornamento atomico dei voti
      if (upVote) {
        if (!likedIdea.upVote) {
          // Incrementa upvote e aggiorna il record del like
          await Idea.updateOne(
            { _id: objectId },
            { $inc: { upvote: 1 } }
          );
          likedIdea.upVote = true;
        } else {
          // Decrementa upvote solo se il valore non scende sotto 0
          const newUpvoteValue = idea.upvote - 1;
          if (newUpvoteValue >= 0) {
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { upvote: -1 } }
            );
            likedIdea.upVote = false;
          }
        }
      }

      if (downVote) {
        if (!likedIdea.downVote) {
          // Incrementa downvote e aggiorna il record del like
          await Idea.updateOne(
            { _id: objectId },
            { $inc: { downvote: 1 } }
          );
          likedIdea.downVote = true;
        } else {
          // Decrementa downvote solo se il valore non scende sotto 0
          const newDownvoteValue = idea.downvote - 1;
          if (newDownvoteValue >= 0) {
            await Idea.updateOne(
              { _id: objectId },
              { $inc: { downvote: -1 } }
            );
            likedIdea.downVote = false;
          }
        }
      }

      // Salva le modifiche al like
      return await likedIdea.save();
    } catch (error) {
      console.error('Error updating idea:', error);
    }
  }
}
